import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";

const router = express.Router();

router.get('/', async(req,res)=>{
    // 獲取搜尋查詢參數
    const searchTerm = req.query.q;

    // 構建 SQL 查詢
    const sql = ` SELECT * FROM article `;
    if (searchTerm) {
        sql += ` WHERE article_item LIKE '%${searchTerm}%' OR teacher_name LIKE '%${searchTerm}%'`;
    }

    let rows = [];
    let fields;
    try {
        [rows, fields] = await db.query(sql);
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ error: '內部伺服器錯誤' });
    }
    rows.forEach((v,i) => {
      const localpostdate = dayjs(v.post_date).format('YYYY-DD-MM');
      v.post_date = localpostdate;
    })

    console.log('rows',rows);
    res.json(rows);
});

// 動態路由 接收名稱
router.get("/:article_id", async (req, res) => {
    // 用變數接收動態路由
    const article_id = req.params.article_id
    const sql = `SELECT * FROM article WHERE article_id = ${article_id}`;
  
    let rows = [];
    let fields;
  
    try {
      [rows, fields] = await db.query(sql);
    } catch (ex) {
      console.log(ex);
    }

    rows.forEach((v,i) => {
      const localpostdate = dayjs(v.post_date).format('YYYY-DD-MM');
      v.post_date = localpostdate;
    })
    // 拿第一個物件
    res.json(rows[0]);
  });
export default router;