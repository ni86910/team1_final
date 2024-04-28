import express from "express";
import db from "./../utils/mysql2-connect.js";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

// 定義安全的私鑰字串
const accessTokenSecret = "dkjsfklsUGLJ677sjfs";

router.post("/", async function (req, res, next) {
  // 檢查從前端來的資料
  const { displayName, uid, photoURL, email } = req.body;

  if (!displayName || !uid || !photoURL || !email) {
    console.log("缺少 Google 登入資料");
    return res
      .status(400)
      .json({ status: "error", message: "缺少 Google 登入資料" });
  }

  try {
    // 在此處可以執行驗證 Google Access Token 的相關程式碼
    // 如果驗證通過，可以創建或查詢對應的使用者資料

    // 假設驗證成功並從 Google 獲取的用戶資料已存在於資料庫中，或已創建了新的用戶資料
    const user = {
      m_name: displayName,
      google_uid: uid,
      photo_url: photoURL,
      google_email: email,
    };

    // 假設已經有了一個 user 模型，你需要使用它來執行資料庫的操作
    // 這裡只是一個示例，實際上你需要替換為你的資料庫操作程式碼
    const [result] = await db.query(
      "INSERT INTO member (`m_name`,`google_uid`,`photo_url`,`google_email`) VALUES (?,?,?,?)",
      [user.m_name, user.google_uid, user.photo_url, user.google_email]
    );

    if (result.affectedRows) {
      // 插入成功
      // 產生存取令牌 (Access Token)，其中包含用戶資料
      const accessToken = jsonwebtoken.sign(user, accessTokenSecret, {
        expiresIn: "3d",
      });

      // 使用 httpOnly cookie 來將存取令牌傳送給前端
      res.cookie("accessToken", accessToken, { httpOnly: true });

      // 返回存取令牌給前端
      return res.status(200).json({
        status: "success",
        data: {
          accessToken,
        },
      });
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "無法創建用戶資料" });
    }
  } catch (error) {
    console.error("Google 登入錯誤:", error);
    return res.status(500).json({ status: "error", message: "登入失敗" });
  }
});

export default router;
