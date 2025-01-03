// 引入 axios 庫，用於發送 HTTP 請求
import axios from "axios";

// 定義 API 的基礎 URL
const API_URL =
  "https://project-mern-library-volunteer-b10982d95102.herokuapp.com/api/courses";

class CourseService {
  // 定義一個方法，用於向伺服器發送 POST 請求以新增課程
  post(title, description, price) {
    let token;

    // 檢查本地存儲是否有 "user" 資料
    if (localStorage.getItem("user")) {
      // 如果有，從 localStorage 中取出用戶的 token
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      // 如果沒有用戶資料，設置 token 為空字符串
      token = "";
    }

    // 發送 POST 請求到 API_URL，提交課程資料
    return axios.post(
      API_URL, // 請求的 URL
      { title, description, price }, // 傳遞的課程資料
      {
        headers: {
          // 將 token 添加到 Authorization 標頭中
          Authorization: token,
        },
      }
    );
  }

  // 使用學生 id，找到學生註冊的課程
  getEnrolledCourses(_id) {
    let token;
    if (localStorage.getItem("user")) {
      // 如果有，從 localStorage 中取出用戶的 token
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      // 如果沒有用戶資料，設置 token 為空字符串
      token = "";
    }
    return axios.get(API_URL + "/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 定義一個方法，用於向伺服器發送 GET 請求以獲取特定講師的課程
  // 使用instructor id，來找到講師擁有的課程
  get(_id) {
    let token;
    // 檢查本地存儲是否有 "user" 資料
    if (localStorage.getItem("user")) {
      // 如果有，從 localStorage 中取出用戶的 token
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      // 如果沒有用戶資料，設置 token 為空字符串
      token = "";
    }

    // 發送 GET 請求到 API_URL 的特定路徑，附加講師的 _id
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        // 將 token 添加到 Authorization 標頭中
        Authorization: token,
      },
    });
  }

  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      // 如果有，從 localStorage 中取出用戶的 token
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      // 如果沒有用戶資料，設置 token 為空字符串
      token = "";
    }

    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        // 將 token 添加到 Authorization 標頭中
        Authorization: token,
      },
    });
  }

  enroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      // 如果有，從 localStorage 中取出用戶的 token
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      // 如果沒有用戶資料，設置 token 為空字符串
      token = "";
    }
    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: {
          // 將 token 添加到 Authorization 標頭中
          Authorization: token,
        },
      }
    );
  }
}

// 將 CourseService 的實例作為默認匯出，供其他模組使用
export default new CourseService();
