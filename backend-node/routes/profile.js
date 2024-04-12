import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

router.get("/profile", async (req, res) => {
  
    const sql = `SELECT * FROM \`member\` WHERE m_account `; // 添加 LIMIT 1 以僅返回第一筆資料

    try {
      const [rows, fields] = await db.query(sql);
      if (rows.length > 0) {
        // 將 ISO 8601 格式的日期轉換為 "yyyy-MM-dd" 格式
        const formattedDate = new Date(rows[0].birthday).toISOString().split('T')[0];
        rows[0].birthday = formattedDate;
        
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: "No member data found" }); // 如果找不到任何資料，返回 404 錯誤
      }
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ error: "Internal Server Error" }); // 如果發生錯誤，返回 500 錯誤
    }
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
  

