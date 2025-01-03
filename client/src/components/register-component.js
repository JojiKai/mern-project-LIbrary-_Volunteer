import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("student"); // 預設值為 student
  let [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功...將導向至登入頁面...");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
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
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {message && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1.5rem",
              border: "1px solid #f5c6cb",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="username"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            姓名：
          </label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="email"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            電子信箱：
          </label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="password"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            學號：
          </label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文或數字"
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="role"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            身份：
          </label>
          <input
            onChange={handleRole}
            type="text"
            className="form-control"
            placeholder="只能填入 student 或 instructor 其一"
            name="role"
            value={role} // 預設值為 student
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
          onClick={handleRegister}
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            color: "#ffffff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
