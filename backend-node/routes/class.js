import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

router.get("/detail", async (req, res) => {
  // JS是 non blocking io php 是blocking
  const sql = "SELECT * FROM class WHERE `class_type`='靜態課程'";

  // 下面不一定長這樣
  // promise處理完後，拿到的是陣列 第一個元素會依 SQL 語法不同而異
  // 若是 SQL SELECT，拿到 1.資料的陣列，2.欄位的資料
  let rows = [];
  let fields; // 通常這是不需要取得欄位定義的資料 要看一下就res.json({rows,fields});
  //用await要捕捉錯誤 要像這樣，用.then 就用.catch
  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }
  res.json(rows);
});

export default router;
