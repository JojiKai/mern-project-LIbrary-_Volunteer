import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
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
            在獲取您的個人資料之前，您必須先登錄。
          </p>
        </div>
      )}
      {currentUser && (
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
            您的個人檔案：
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e9ecef" }}>
                <td
                  style={{
                    padding: "0.75rem",
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  姓名：
                </td>
                <td style={{ padding: "0.75rem", color: "#333" }}>
                  {currentUser.user.username}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e9ecef" }}>
                <td
                  style={{
                    padding: "0.75rem",
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  您的用戶ID：
                </td>
                <td style={{ padding: "0.75rem", color: "#333" }}>
                  {currentUser.user._id}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e9ecef" }}>
                <td
                  style={{
                    padding: "0.75rem",
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  您註冊的電子信箱：
                </td>
                <td style={{ padding: "0.75rem", color: "#333" }}>
                  {currentUser.user.email}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0.75rem",
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  身份：
                </td>
                <td style={{ padding: "0.75rem", color: "#333" }}>
                  {currentUser.user.role}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
