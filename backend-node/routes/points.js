import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";

const router = express.Router();

// 取會員總點數
router.get("/all_points", async (req, res) => {
  console.log("query", req.query);
  const member_id = req.query.member_id;

  const sql1 = `SELECT * FROM bonus_points
  
  WHERE bonus_points.member_id = ?`;

  let rows = [];
  let fields;
  // let totalPoint;
  let output = {totalPoint:0}
  try {
    [rows, fields] = await db.query(sql1, [member_id]); // 使用參數化查詢並提供參數值
    rows.forEach((v, i) => {
      output.totalPoint += v.points;
    });

    res.json(output); // 將點數資料回傳給前端
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Internal Server Error"); // 處理錯誤並回傳 500 錯誤給前端
  }
});

// 取會員獲得紀錄
router.get("/add_records", async (req, res) =>{
  const member_id = req.query.member_id;
  const sql2 = `SELECT * FROM bonus_points
  WHERE bonus_points.member_id = ?`;
})

export default router;
