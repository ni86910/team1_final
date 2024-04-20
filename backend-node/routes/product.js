import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let keyword = req.query.keyword || "";
  let category = req.query.category || "";
  let minPrice = req.query.minPrice || ""; // 新增最低價格參數
  let maxPrice = req.query.maxPrice || ""; // 新增最高價格參數
  let orderBy = req.query.orderBy || "product_id ASC"; // 預設排序方式為 product_id ASC
  let where = " WHERE 1 ";

  console.log("category", category);
  console.log("minPrice",minPrice);
  console.log("req.query",req.query);

  if (keyword) {
    // 避免 SQL injection
    where += ` AND (product_name LIKE ${db.escape(`%${keyword}%`)}) `;
  }

  // if (category) {
  //   // 將 category 作為條件添加到 SQL 查詢中
  //   let categories = Array.isArray(category) ? category : [category]; // 確保 category 是陣列
  //   const categoryConditions = categories
  //     .map((cat) => `category_id = ${db.escape(cat)}`)
  //     .join(" OR ");
  //   where += ` AND (${categoryConditions}) `;
  // }

  if(category && category !== 'undefined'){
    where += ` AND (category_id = ${db.escape(category)}) `;
  }

  if (minPrice) {
    where += ` AND (price >= ${db.escape(minPrice)}) `;
  }

  if (maxPrice) {
    where += ` AND (price <= ${db.escape(maxPrice)}) `;
  }

  // 根據前端傳遞的排序方式動態生成 ORDER BY 子句
  let orderByClause = "";
  switch (orderBy) {
    case "newest":
      orderByClause = "created_at DESC";
      break;
    case "oldest":
      orderByClause = "created_at ASC";
      break;
    case "priceHigh":
      orderByClause = "price DESC";
      break;
    case "priceLow":
      orderByClause = "price ASC";
      break;
    default:
      orderByClause = "product_id ASC";
      break;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = req.query.perPage || 12; // 從 query 中取得每頁顯示商品數量
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
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }

  const totalPages = Math.ceil(totalRows / perPage); // 總頁數

  if (totalRows > 0 && page > totalPages) {
    redirect = `?page=${totalPages}`;
    return res.json({ success: false, redirect });
  }

  const limitStart = (page - 1) * perPage;
  const selectSql = `SELECT * FROM product ${where} ORDER BY ${orderByClause} LIMIT ${limitStart}, ${perPage}`;

  console.log("selectSql", selectSql);

  let rows = [];

  try {
    [rows] = await db.query(selectSql);
  } catch (ex) {
    console.error("Error fetching data:", ex);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }

  return res.json({
    success: true,
    totalRows,
    perPage,
    totalPages,
    rows,
    page,
    keyword,
    category,
    orderBy, // 將排序方式返回給前端
    qs: req.query,
  });
});

// 商品詳細頁面的路徑
router.get("/:p_id", async (req, res) => {
  const p_id = req.params.p_id;
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
