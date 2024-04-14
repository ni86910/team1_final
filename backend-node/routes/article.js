import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";

const router = express.Router();

router.get('/', async(req,res)=>{
    // 構建 SQL 查詢
    const sql = ` SELECT * FROM article `;
    

    let rows = [];
    let fields;
    try {
        [rows, fields] = await db.query(sql);
        rows.forEach((v,i) => {
          const localpostdate = dayjs(v.post_date).format('YYYY-DD-MM');
          v.post_date = localpostdate;
        })
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ error: '內部伺服器錯誤' });
    }
   

    console.log('rows',rows);
    res.json(rows);
});

// 動態路由 接收名稱
router.get("/:article_id", async (req, res) => {
    // 用變數接收動態路由
    const article_id = req.params.article_id
    const sql = `SELECT * FROM article WHERE article_id = ${article_id} `;
    const sql2 = `SELECT * FROM article_message WHERE article_id = ${article_id} `;
    let rows = [];
    let fields;
    let rows2 = [];
    let fields2;
  
    try {
      [rows, fields] = await db.query(sql);
      rows.forEach((v,i) => {
        const localpostdate = dayjs(v.post_date).format('YYYY-DD-MM');
        v.post_date = localpostdate;
      })
    } catch (ex) {
      console.log(ex);
    }

    try {
      [rows2, fields2] = await db.query(sql2);

    } catch (ex) {
      console.log(ex);
    }
    
    // 拿第一個物件
    res.json({...rows[0],message:rows2});
    
  });

  // 新增每篇文章留言
  router.post("/:article_id", async (req,res) => {
    const output = {
      success: false,
      postData: req.body,
      error: "",
      code: 0,
      };

      const sql = "INSERT INTO article_message (`article_id`,`message_name`,`message_email`,`message_content`) VALUES (?,?,?,?)";

      const [result] = await db.query(sql, [
        req.body.article_id,
        req.body.message_name,
        req.body.message_email,
        req.body.message_content,
      ]);
      if (result.affectedRows) {
        res.json(output);
      }
  })

  // router.put("/:article_id", async (req, res) => {
      
  // })
export default router;