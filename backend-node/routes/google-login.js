import express from "express";
import db from "./../utils/mysql2-connect.js";
import jsonwebtoken from "jsonwebtoken";
const router = express.Router();

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

router.post("/", async function (req, res, next) {
  // providerData =  req.body
  console.log(JSON.stringify(req.body));

  // 檢查從react來的資料
  if (!req.body.providerId || !req.body.uid) {
    console.log("缺少google登入資料");
    return res.json({ status: "error", message: "缺少google登入資料" });
  }

  const { displayName, email, uid, photoURL } = req.body;
  const google_uid = uid;

  // 以下流程:
  // 1. 先查詢資料庫是否有同google_uid的資料
  // 2-1. 有存在 -> 執行登入工作
  // 2-2. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有google來的資料 -> 執行登入工作

  // 1. 先查詢資料庫是否有同google_uid的資料

  const sql =
    "INSERT INTO member (`member_id`,`m_name`,`google_uid`,`photo_url`) VALUES (?,?,?,?)";
  const [result] = await db.query(sql, [
    req.body.member_id,
    req.body.m_name,
    req.body.google_uid,
    req.body.photo_url,
  ]);

  if (result.affectedRows) {
    res.json(output);
  }

  const total = await member.count({
    where: {
      google_uid,
    },
  });

  // 要加到access token中回傳給前端的資料
  // 存取令牌(access token)只需要id和username就足夠，其它資料可以再向資料庫查詢
  let returnUser = {
    member_id: 0,
    m_name: "",
    google_uid: "",
  };

  if (total) {
    // 2-1. 有存在 -> 從資料庫查詢會員資料
    const dbUser = await member.findOne({
      where: {
        google_uid,
      },
      raw: true, // 只需要資料表中資料
    });

    // 回傳給前端的資料
    returnUser = {
      member_id: dbUser.member_id,
      m_name: dbUser.m_name,
      google_uid: dbUser.google_uid,
    };
  } else {
    // 2-2. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有google來的資料 -> 執行登入工作
    const user = {
      m_name: displayName,
      google_uid,
      photo_url: photoURL,
    };

    // 新增會員資料
    const newUser = await member.create(user);

    // 回傳給前端的資料
    returnUser = {
      member_id: newUser.id,
      m_name: "",
      google_uid: newUser.google_uid,
    };
  }

  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jsonwebtoken.sign(returnUser, accessTokenSecret, {
    expiresIn: "3d",
  });

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  res.cookie("accessToken", accessToken, { httpOnly: true });

  // 傳送access token回應(react可以儲存在state中使用)
  return res.json({
    status: "success",
    data: {
      accessToken,
    },
  });
});

export default router;
