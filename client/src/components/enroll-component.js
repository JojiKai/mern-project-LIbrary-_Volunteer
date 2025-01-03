import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/courses.service";

const EnrollComponent = (props) => {
  // 解構 props，獲取當前用戶和設定用戶的方法
  let { currentUser, setCurrentUser } = props;

  // 使用 useNavigate 用於導航
  const navigate = useNavigate();

  // 用於存儲搜索框的輸入值
  let [searchInput, setSearchInput] = useState("");

  // 用於存儲 API 返回的搜索結果
  let [searchResult, setSearchResult] = useState(null);

  // 當用戶未登入時，點擊按鈕導向到登入頁面
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  // 更新搜索框的輸入值
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  // 使用 CourseService 發送請求，根據輸入值進行課程搜索
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput) // 調用 API，傳遞搜索輸入值
      .then((data) => {
        console.log(data); // 將返回的數據記錄到控制台
        setSearchResult(data.data); // 更新搜索結果的 state
      })
      .catch((err) => {
        console.log(err); // 錯誤處理
      });
  };

  // 使用 CourseService 發送請求進行課程註冊
  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id) // 以課程 ID 作為參數發送註冊請求
      .then(() => {
        window.alert("課程註冊成功。重新導向到課程頁面。");
        navigate("/course"); // 成功後導向課程頁面
      })
      .catch((err) => {
        console.log(err); // 錯誤處理
      });
  };

  // 元件的渲染部分
  return (
    <div style={{ padding: "3rem" }}>
      {/* 如果用戶未登入 */}
      {!currentUser && (
        <div>
          <p>你必須先登入才能開始註冊課程</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}

      {/* 如果用戶是講師 */}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生能夠註冊課程</h1>
        </div>
      )}

      {/* 如果用戶是學生 */}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          {/* 搜索輸入框 */}
          <input
            placeholder="請輸入單位名稱"
            onChange={handleChangeInput} // 監聽輸入值變化
            type="text"
            className="form-control"
          />
          {/* 搜索按鈕 */}
          <button onClick={handleSearch} className="btn btn-primary">
            搜尋
          </button>
        </div>
      )}

      {/* 如果有搜索結果且結果不為空 */}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>從 API 返回的數據。</p>
          {/* 遍歷搜索結果，渲染每個課程 */}
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">課程名稱：{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>價格: {course.price}</p>
                <p>目前的學生人數: {course.students.length}</p>
                <p>管理者: {course.instructor.username}</p>
                {/* 註冊按鈕，點擊觸發 handleEnroll */}
                <a
                  href="#"
                  onClick={handleEnroll}
                  className="card-text btn btn-primary"
                  id={course._id} // 傳遞課程 ID
                >
                  註冊課程
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
