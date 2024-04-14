import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

// 登入
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const output = {
    success: false,
    body: req.body,
  };
  const { m_account, m_pwd } = req.body;

  const sql = "SELECT * FROM member WHERE m_account=?";
  const [rows] = await db.query(sql, [m_account]);

  if (!rows.length) {
    // 帳號是錯誤的
    return res.json(output);
  }

  const result = await bcrypt.compare(m_pwd, rows[0].m_pwd);
  output.success = result;
  if (result) {
    // 密碼是正確的

    // 使用 session 記住用戶
    req.session.admin = {
      member_id: rows[0].member_id,
      m_account,
      m_name: rows[0].m_name,
    };
  }
  res.json(output);
});

  export default router;

  

