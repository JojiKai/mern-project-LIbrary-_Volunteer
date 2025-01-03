import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/courses.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        window.alert("新課程已創建成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div
      style={{
        padding: "3rem",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!currentUser && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#333" }}>
            在發布新課程之前，您必須先登錄。
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
            style={{
              backgroundColor: "#007bff",
              border: "none",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#333" }}>
            只有講師可以發布新課程。
          </p>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              color: "#333",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            志工預約表單
          </h2>
          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="exampleforTitle"
              style={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              服務單位：
            </label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="exampleforTitle"
              onChange={handleChangeTitle}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="exampleforContent"
              style={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              服務內容：
            </label>
            <textarea
              className="form-control"
              id="exampleforContent"
              aria-describedby="emailHelp"
              name="content"
              onChange={handleChangeDesciption}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="exampleforPrice"
              style={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              課程價格：
            </label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="exampleforPrice"
              onChange={handleChangePrice}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={postCourse}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              color: "#ffffff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            交出表單
          </button>
          {message && (
            <div
              className="alert alert-warning"
              role="alert"
              style={{
                backgroundColor: "#fff3cd",
                color: "#856404",
                padding: "1rem",
                borderRadius: "4px",
                marginTop: "1rem",
                border: "1px solid #ffeeba",
              }}
            >
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
