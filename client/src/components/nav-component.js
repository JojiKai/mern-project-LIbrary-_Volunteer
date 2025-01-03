import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout(); // 清空 local storage
    window.alert("已登出...現在將您導向至首頁");
    setCurrentUser(null);
  };

  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div
            className="container-fluid"
            style={{
              backgroundColor: "#071e29",
              padding: "10px",
            }}
          >
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                style={{
                  backgroundColor: "white", // 修改背景顏色
                  // borderRadius: "5%", // 可選，讓圖標圓角
                }}
              ></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/"
                    style={{
                      color: "white",
                    }}
                  >
                    首頁
                  </Link>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/register"
                      style={{
                        color: "white",
                      }}
                    >
                      學生註冊
                    </Link>
                  </li>
                )}

                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/login"
                      style={{
                        color: "white",
                      }}
                    >
                      登入
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link
                      onClick={handleLogout}
                      className="nav-link"
                      to="/"
                      style={{
                        color: "white",
                      }}
                    >
                      登出
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/profile"
                      style={{
                        color: "white",
                      }}
                    >
                      個人頁面
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/course"
                      style={{
                        color: "white",
                      }}
                    >
                      課程頁面
                    </Link>
                  </li>
                )}

                {currentUser && currentUser.user.role == "instructor" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/postCourse"
                      style={{
                        color: "white",
                      }}
                    >
                      新增課程
                    </Link>
                  </li>
                )}

                {currentUser && currentUser.user.role == "student" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/enroll"
                      style={{
                        color: "white",
                      }}
                    >
                      註冊課程
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
