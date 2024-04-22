import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";
const router = express.Router();

// 獲得// 獲得某A會員的 所有文章收藏
router.get("/all-fav", async (req, res) => {
  console.log("query", req.query);
  const member_id = req.query.member_id;

  const sql = `SELECT * 
  FROM article AS a 
  JOIN fav AS f ON f.article_id = a.article_id
  JOIN member AS m ON  f.member_id = m.member_id
  WHERE m.member_id = ${member_id}`;

  let rows = [];
  let fields; // 通常這是不需要取得欄位定義的資料 要看一下就res.json({rows,fields});
  //用await要捕捉錯誤 要像這樣，用.then 就用.catch

  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }

  // 開始時間 原本抓出來會是UTC時間，要轉成當地時間，再塞回去
  rows.map((v, i) => {
    v.fav_time = dayjs(v.fav_time).format("YYYY-MM-DD");
    return v;
  });

  res.json(rows);
  // res.json(output);
});

// 刪除收藏的路由
router.delete("/del-fav", async (req, res) => {
  //概念上只會刪除收藏id
  const output = {
    fav_id: 0,
  };

  console.log("body", req.body);
  const fav_id = +req.body.fav_id;

  output.fav_id = +fav_id;

  const sql = `DELETE FROM fav WHERE fav_id=? `; // 用問號 會自動跳脫，值 按照順序丟到下方陣列 包成陣列是為了應付所有的SQL語法
  const [result] = await db.query(sql, [fav_id]);

  res.json(result);
});

export default router;
