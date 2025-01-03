import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/courses.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role === "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]);

  return (
    <div
      style={{
        padding: "3rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* 未登入時的顯示 */}
      {!currentUser && (
        <div style={{ textAlign: "center", color: "#555" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            您必須先登入才能看到課程
          </p>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}

      {/* 講師角色的顯示 */}
      {currentUser && currentUser.user.role === "instructor" && (
        <div style={{ textAlign: "center", color: "#333" }}>
          <h1 style={{ color: "#007bff", marginBottom: "1rem" }}>
            歡迎來到管理者的頁面
          </h1>
        </div>
      )}

      {/* 學生角色的顯示 */}
      {currentUser && currentUser.user.role === "student" && (
        <div style={{ textAlign: "center", color: "#333" }}>
          <h1 style={{ color: "#28a745", marginBottom: "1rem" }}>
            歡迎來到學生的頁面
          </h1>
        </div>
      )}

      {/* 課程清單 */}
      {currentUser && courseData && courseData.length !== 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {courseData.map((course) => (
            <div
              key={course._id}
              style={{
                width: "300px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
              }}
            >
              <div style={{ padding: "1rem" }}>
                <h5
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#007bff",
                    marginBottom: "1rem",
                  }}
                >
                  課程名稱: {course.title}
                </h5>
                <p style={{ margin: "0.5rem 0", color: "#555" }}>
                  {course.description}
                </p>
                <p style={{ margin: "0.5rem 0", color: "#555" }}>
                  學生人數: {course.students.length}
                </p>
                <p style={{ margin: "0.5rem 0", color: "#555" }}>
                  課程價格: ${course.price}
                </p>
                <p style={{ margin: "0.5rem 0", color: "#555" }}>
                  管理者: {course.instructor.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
