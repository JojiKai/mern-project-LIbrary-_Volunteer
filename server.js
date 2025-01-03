// 引入必要的模組
const express = require("express"); // Express 用於建立 HTTP 伺服器
const app = express(); // 初始化 Express 應用程式
const mongoose = require("mongoose"); // Mongoose 用於操作 MongoDB 資料庫
const dotenv = require("dotenv"); // dotenv 用於讀取環境變數
dotenv.config(); // 載入 .env 檔案中的環境變數
const authRoute = require("./routes").auth; // 引入用戶相關的路由處理
const courseRoute = require("./routes").course; // 引入課程相關的路由處理
const passport = require("passport"); // Passport 用於實現身份驗證
require("./config/passport")(passport); // 引入並初始化 Passport 設定
const cors = require("cors"); // CORS 用於處理跨來源資源共享問題
const path = require("path"); // Path 用於操作檔案和目錄的路徑
const port = process.env.PORT || 8080; // process.env.PORT是Heroku自動設定

// 連接到 MongoDB 資料庫
mongoose
  .connect("process.env.MONGODB_CONNECTION") // 指定 MongoDB 的連接 URL
  .then(() => {
    console.log("連結到mongodb..."); // 成功連結時的提示
  })
  .catch((e) => {
    console.log(e); // 連結失敗時的錯誤訊息
  });

// Middleware
app.use(express.json()); // 解析 JSON 格式的請求資料
app.use(express.urlencoded({ extended: true })); // 解析 URL 編碼的請求資料
app.use(cors()); // 啟用 CORS，允許跨域請求
app.use(express.static(path.join(__dirname, "client", "build"))); // 提供靜態檔案服務，指向 React 的 build 資料夾

// 路由設置
app.use("/api/user", authRoute); // 設置 /api/user 路由處理用戶相關的請求
// course route應該被jwt保護
// 如果 request header 內部沒有 jwt，則request就會被視為是unauthorized

// 設置 /api/courses 路由，並使用 Passport 的 JWT 驗證保護路由
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }), // 如果請求未提供 JWT，將回傳未授權的錯誤
  courseRoute // 將請求傳遞給課程相關的路由處理程式
);

// 如果環境變數設定為 production 或 staging，處理所有未知路由
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  // 所有未匹配的路由都將返回 React 的 index.html，支持 SPA 的前端路由
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// 啟動伺服器並監聽 port 8080
app.listen(port, () => {
  console.log("後端伺服器在聆聽port 8080...");
});
