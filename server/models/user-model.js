const mongoose = require("mongoose"); // 引入 mongoose 套件
const { Schema } = mongoose; // 從 mongoose 中解構 Schema
const bcrypt = require("bcrypt"); // 引入 bcrypt 套件用於密碼雜湊

// 定義 User Schema
const userSchema = new Schema({
  username: {
    type: String, // 使用者名稱類型為字串
    required: true, // 必填
    minlength: 2, // 最小長度為 2
    maxlength: 25, // 最大長度為 30
  },
  email: {
    type: String, // 電子郵件類型為字串
    required: true, // 必填
    minlength: 6, // 最小長度為 6
    maxlength: 40, // 最大長度為 40
  },
  password: {
    type: String, // 密碼類型為字串
    required: true, // 必填
  },
  role: {
    type: String, // 角色類型為字串
    enum: ["student", "instructor"], // 只能為 student 或 instructor
    required: true, // 必填
  },
  date: {
    type: Date, // 日期類型
    default: Date.now, // 預設為目前時間
  },
});

// instance methods
userSchema.methods.isStudent = function () {
  // 判斷是否為 student 角色
  return this.role == "student";
};

userSchema.methods.isInstructor = function () {
  // 判斷是否為 instructor 角色
  return this.role == "instructor";
};

userSchema.methods.comparePassword = async function (password, cb) {
  // 比較密碼是否正確
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

// moogoose middLewares

// 若使用者為新用戶，或正在更改密碼，則將密碼進行雜湊處理
userSchema.pre("save", async function (next) {
  // `this` 代表目前 mongoDB 的 document
  if (this.isNew || this.isModified("password")) {
    // 若是新建文檔或密碼欄位被修改，執行密碼雜湊處理
    const hashValue = await bcrypt.hash(this.password, 10); // 雜湊密碼，使用 saltRounds 為 10
    this.password = hashValue; // 將雜湊後的密碼覆蓋原密碼
  }
  next(); // 繼續執行下一個 middleware 或儲存動作
});

// 匯出 User 模型
module.exports = mongoose.model("User", userSchema);
