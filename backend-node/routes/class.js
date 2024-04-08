import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

router.get("/", async (req, res) => {

  const class_type = req.query.class_type ? req.query.class_type :'靜態課程'

  console.log('class_type:',class_type);

  const sql = `SELECT * FROM class WHERE \`class_type\` = '${class_type}'`;

  // 下面不一定長這樣
  // promise處理完後，拿到的是陣列 第一個元素會依 SQL 語法不同而異
  // 若是 SQL SELECT，拿到 1.資料的陣列，2.欄位的資料
  let rows = [];
  let fields; // 通常這是不需要取得欄位定義的資料 要看一下就res.json({rows,fields});
  //用await要捕捉錯誤 要像這樣，用.then 就用.catch
  try {
    [rows, fields] = await db.query(sql);
    if(rows.length === 0){
      [rows, fields] = await db.query(`SELECT * FROM class WHERE \`class_type\` = '靜態課程'`)
    }
  } catch (ex) {
    console.log(ex);
  }
  console.log('rows',rows);
  res.json(rows);
});

// 動態路由 接收課程名稱
router.get("/:class_id", async (req, res) => {
  // 用變數接收動態路由
  const class_id = req.params.class_id
  const sql = `SELECT * FROM class WHERE class_id = ${class_id}`;

  let rows = [];
  let fields;

  try {
    [rows, fields] = await db.query(sql);
    // console.log(class_name);
  } catch (ex) {
    console.log(ex);
  }
  // 拿第一個物件
  res.json(rows[0]);
});

export default router;
