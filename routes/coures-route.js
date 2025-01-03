const router = require("express").Router(); // 引入 express 的 Router 物件並初始化
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("course route正在接受一個request...");
  next();
});

// 獲得系統中的所有課程
router.get("/", async (req, res) => {
  try {
    let courseFound = await Course.find({})
      // query object (thenable object)
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用講師id來尋找課程
router.get("/instructor/:_instructor_id", async (req, res) => {
  let { _instructor_id } = req.params;
  let courseFound = await Course.find({ instructor: _instructor_id })
    .populate("instructor", ["username", "email"])
    .exec();
  return res.send(courseFound);
});

// 用學生id來尋找註冊過的課程
router.get("/student/:_student_id", async (req, res) => {
  let { _student_id } = req.params;
  let courseFound = await Course.find({ students: _student_id })
    .populate("instructor", ["username", "email"])
    .exec();
  return res.send(courseFound);
});

// 用課程名稱尋找課程
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    // 使用正則表達式進行模糊匹配，忽略大小寫
    let courseFound = await Course.find({
      title: { $regex: name, $options: "i" },
    })
      .populate("instructor", ["email", "username"])
      .exec();

    // 如果未找到課程，返回 404
    if (!courseFound || courseFound.length === 0) {
      return res.status(404).send("未找到匹配的課程");
    }

    return res.send(courseFound);
  } catch (e) {
    console.error("Error in /findByName route:", e);
    return res.status(500).send("內部伺服器錯誤");
  }
});

// 用課程id尋找課程
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", ["email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 新增課程
router.post("/", async (req, res) => {
  // 驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isStudent()) {
    return res
      .status(400)
      .send("只有講師才能發布新課程，若您已是講師，請透過講師帳號登陸");
  }
  // 建立新課程
  let { title, description, price } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let saveCourse = await newCourse.save();
    return res.send({
      message: "新課程已經保存",
      saveCourse,
    });
  } catch (e) {
    return res.status(500).send("無法創建課程...");
  }
});

// 讓學生透過課程id註冊新課程
router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  // jwt
  course.students.push(req.user._id);
  await course.save();
  res.send("註冊完成");
});

// 更改課程
router.patch("/:_id", async (req, res) => {
  // 驗證數據符合規範
  let { error } = courseValidation(req.body); // 先查看有沒有error
  if (error) return res.status(400).send(error.details[0].message);
  // 先拿到ID
  let { _id } = req.params;
  // 先確認課程是否存在
  try {
    let courseFound = await Course.findOne({ _id });
    if (!courseFound) {
      return res.status(400).send("未找到課程。無法更新課程內容...");
    }
    // 更新課程(使用者必須是此課程講師，才能編輯課程)
    if (courseFound.instructor.equals(req.user._id)) {
      let updateCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        message: "課程已經更新成功",
        updateCourse,
      });
    } else {
      return res.status(403).send("只有此課程的講師，才能編輯課程...");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

//刪除課程
router.delete("/:_id", async (req, res) => {
  // 先拿到ID
  let { _id } = req.params;
  // 先確認課程是否存在
  try {
    let courseFound = await Course.findOne({ _id });
    if (!courseFound) {
      return res.status(400).send("未找到課程。無法刪除課程內容...");
    }
    // 更新課程(使用者必須是此課程講師，才能刪除課程)
    if (courseFound.instructor.equals(req.user._id)) {
      await Course.deleteOne({ _id }).exec();
      return res.send("課程已經被刪除");
    } else {
      return res.status(403).send("只有此課程的講師，才能刪除課程...");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
}),
  (module.exports = router);
