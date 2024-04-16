import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log('jwt=',res.locals.jwt)

  
    const sql = `SELECT * FROM \`member\` WHERE m_account ='${res.locals.jwt.m_account}'`; 

    try {
      const [rows, fields] = await db.query(sql);
      if (rows.length > 0) {
        // 將 ISO 8601 格式的日期轉換為 "yyyy-MM-dd" 格式
        const formattedDate = new Date(rows[0].birthday).toISOString().split('T')[0];
        rows[0].birthday = formattedDate;
        
        res.json(rows[0]);
      } else {
        res.status(204).json({ error: "No member data found" }); 
      }
    } catch (ex) {
      console.log(ex);
      res.status(200).json({ error: "Internal Server Error" }); 
    }
  });

  // 修改資料的表單
router.get("/profile/:member_id", async (req, res) => {
  const member_id = +req.params.member_id || 0;
  if (!member_id) {
    return res.redirect("/profile");
  }
  const sql = `SELECT * FROM member WHERE member_id=${member_id}`;
  const [rows] = await db.query(sql);
  if (!rows.length) {
    return res.redirect("/profile");
  }
  const r = rows[0];
  const d = dayjs(r.birthday);
  r.birthday = d.isValid() ? d.format("YYYY-MM-DD") : "";
  res.render("member/profile", r);
});

router.put("/:member_id", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };
  console.log(req.body);

  let member_id = +req.params.member_id || 0;

  let birthday = dayjs(req.body.birthday, "YYYY-MM-DD", true); // dayjs 物件
  // 置換處理過的值
  req.body.birthday = birthday.isValid() ? birthday.format("YYYY-MM-DD") : null;

  // TODO: 資料格式檢查

  const sql = "UPDATE `member` SET ? WHERE member_id=?";
  try {
    // 執行 SQL 時最好做錯誤處理
    const [result] = await db.query(sql, [req.body, member_id]);
    /*
    {
      "fieldCount": 0,
      "affectedRows": 1,
      "insertId": 0,
      "info": "Rows matched: 1  Changed: 1  Warnings: 0",
      "serverStatus": 2,
      "warningStatus": 0,
      "changedRows": 1
    }
    */
    output.success = !!(result.affectedRows && result.changedRows);
  } catch(ex){
    output.error = ex.toString();
  }
  res.json(output);
});

router.get("/zod", (req, res) => {
  const strSchema = z.string().min(4, { message: "請填寫長度四以上的字串" });

  res.json({
    result: strSchema.safeParse("12"),
  });
});

  export default router;

  /* 
  const [rows, fields] = await db.query(sql);：此行代碼使用資料庫查詢函數（假設是db.query）來執行SQL查詢，並將結果儲存在rows和fields中。rows是包含檢索到的資料行的陣列，fields是資料表的字段信息。

  if (rows.length > 0) {：這個條件語句檢查是否有檢索到任何資料。如果rows陣列的長度大於0，表示有檢索到資料，進入條件中的程式碼塊。

  const formattedDate = new Date(rows[0].birthdate).toISOString().split('T')[0];：此行程式碼對檢索到的日期進行格式轉換。它的執行步驟如下：

  rows[0].birthdate：假設資料庫中的日期存儲在birthdate字段中。
  new Date(rows[0].birthdate)：將資料庫檢索到的日期值轉換為JavaScript的Date物件。
  .toISOString()：將JavaScript的Date物件轉換為ISO 8601格式的字串，包括日期和時間。
  .split('T')[0]：將ISO 8601格式的字串以字元'T'分割，並選取第一部分，即日期部分，以達到只保留日期的目的。
  const formattedDate：將格式化後的日期存儲在formattedDate變數中。
  rows[0].birthdate = formattedDate;：將格式化後的日期賦值給rows陣列中的第一個資料行的birthdate字段。這樣就完成了日期格式的轉換。 */
  

