import express from "express";
import db from "./../utils/mysql2-connect.js";
import { z } from "zod";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";

const router = express.Router();

// 呈現新增資料的表單
router.get("/register", async (req, res) => {
  res.render("member/register");
});
// 處理新增資料的表單
router.post("/register", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };
  // TODO: 資料格式檢查
  const formSchema = z.object({
    m_name: z.string().min(2, { message: "名字長度要大於等於 2" }),
    m_account: z.string().email({ message: "請填寫正確的 email" }),
    mobile: z
      .string()
      .regex(/^09\d{2}-?\d{3}-?\d{3}$/, { message: "請填寫正確的手機號碼" }),
      m_pwd: z.string().min(6, { message: "密碼長度要大於等於 6" }), // 新增密碼檢查
  });

  const parseResult = formSchema.safeParse(req.body);
  if (!parseResult.success) {
    output.issues = parseResult.error.issues;
    return res.json(output);
  }

  let birthday = dayjs(req.body.birthday, "YYYY-MM-DD", true); // dayjs 物件
  birthday = birthday.isValid() ? birthday.format("YYYY-MM-DD") : null;
  req.body.birthday = birthday; // 置換處理過的值

  try {
    // 將使用者密碼轉換成雜湊值
    const hashPassword = await bcrypt.hash(req.body.m_pwd, 10);
    req.body.m_pwd = hashPassword;


  /*
  const sql = "INSERT INTO `address_book`(`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUES (?, ?, ?, ?, ?, NOW())";
  const [result] = await db.query(sql, [
    req.body.name,
    req.body.email,
    req.body.mobile,
    req.body.birthday,
    req.body.address,
  ]);
  */

  const sql2 = "INSERT INTO `member` SET ?";
  req.body.created_at = new Date(); // 新增屬性 created_at (欄位名稱)
  let result;
  try {
    [result] = await db.query(sql2, [req.body]);
    output.success = !!result.affectedRows;
    
  } catch (ex) {
    output.error = ex.toString();
  }
} catch (error) {
  output.error = error.toString();
}
res.json(output);

// 要處理 multipart/form-data
/*
router.post("/register/multi", upload.none(), async (req, res) => {
  res.json(req.body);
});*/

  /*
{
    "fieldCount": 0,
    "affectedRows": 1, // 新增的列數
    "insertId": 1031,  // 此筆新增資料的 PK
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
}
*/
});
export default router;