import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // 取得會員點數
  const pointSql = `SELECT points FROM bonus_points WHERE member_id = 35`;

  // 假設你從前端傳遞了會員ID作為請求的參數或主體
  //   const memberId = req.body.memberId; // 這只是一個假設，具體取決於你的前端實現方式
  //   const pointSql = `
  //   SELECT member_id, SUM(points) AS total_points
  //   FROM bonus_points
  //   GROUP BY member_id
  // `;

  let rows = [];
  const output = { totalPoints: 0 };
  try {
    const [rows, fields] = await db.query(pointSql);
    rows.forEach((v, i) => {
      output.totalPoints += v.points;
    });
    res.json(output);
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }

  // return res.json({
  //   success: true,
  //   rows,
  //   qs: req.query,
  // });
});

export default router;
