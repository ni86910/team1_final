import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let keyword = req.query.keyword || "";
  let where = " WHERE 1 ";
  if (keyword) {
    // 避免 SQL injection
    where += ` AND (product_name LIKE ${db.escape(`%${keyword}%`)}) `;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 12; // 每頁最多幾筆
  let page = +req.query.page || 1;
  if (page < 1) {
    redirect = "?page=1";
    return res.json({ success: false, redirect });
  }

  const countSql = `SELECT COUNT(1) AS totalRows FROM product ${where}`;
  let totalRows = 0;
  try {
    const [[{ totalRows: count }]] = await db.query(countSql);
    totalRows = count;
  } catch (ex) {
    console.error("Error counting total rows:", ex);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }

  const totalPages = Math.ceil(totalRows / perPage); // 總頁數

  if (totalRows > 0 && page > totalPages) {
    redirect = `?page=${totalPages}`;
    return res.json({ success: false, redirect });
  }

  const limitStart = (page - 1) * perPage;
  const selectSql = `SELECT * FROM product ${where} ORDER BY product_id ASC LIMIT ${limitStart}, ${perPage}`;

  let rows = [];
  
  try {
    [rows] = await db.query(selectSql);
  } catch (ex) {
    console.error("Error fetching data:", ex);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }

  return res.json({
    success: true,
    totalRows,
    perPage,
    totalPages,
    rows,
    page,
    keyword,
    qs: req.query,
  });
});

router.get("/:p_id", async (req, res) => {

  const p_id = req.params.p_id
  const sql = `SELECT * FROM product WHERE product_id = ${p_id}`;

  let rows = [];
  let fields; 
  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }
  res.json(rows);
  
});

export default router;
