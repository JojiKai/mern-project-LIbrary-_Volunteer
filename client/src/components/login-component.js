import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功，將重新導向至個人資料頁面");
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
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
          maxWidth: "400px",
        }}
      >
        {message && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1rem",
              border: "1px solid #f5c6cb",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}
        <div className="form-group" style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="username"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
              fontSize: "1rem",
              color: "#333",
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
        <div className="form-group" style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="password"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
              fontSize: "1rem",
              color: "#333",
            }}
          >
            密碼：
          </label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          />
        </div>
        <div className="form-group">
          <button
            onClick={handleLogin}
            className="btn btn-primary btn-block"
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
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
