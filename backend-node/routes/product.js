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

// 以下是收藏
// 某A會員的 所有商品收藏
router.get("/all_fav", async (req, res) => {
  console.log("query", req.query);
  const member_id = req.query.member_id;

  const sql3 = `
  SELECT * FROM fav 
  LEFT JOIN product on fav.product_id = product.product_id
  WHERE 1
  AND member_id = ${member_id}
  `;

  let rows = [];
  let fields; // 通常這是不需要取得欄位定義的資料 要看一下就res.json({rows,fields});
  //用await要捕捉錯誤 要像這樣，用.then 就用.catch
  try {
    [rows, fields] = await db.query(sql3);
  } catch (ex) {
    console.log(ex);
  }
  // 收藏時間 原本抓出來會是UTC時間，要轉成當地時間，再塞回去
  rows.map((v, i) => {
    v.fav_time = dayjs(v.fav_time).format("YYYY-MM-DD HH:mm");
    return v;
  });

  res.json(rows);
});


// 獲得某商品的收藏資訊(用來確認 某A會員 是否有收藏過 某B商品)
router.get("/product_fav", async (req, res) => {
  const output = {
    member_id: 0,
    product_id: 0,
    alreadyFav: false,
  };

  console.log("query", req.query);
  const member_id = req.query.member_id;
  const product_id = req.query.product_id;

  //把會員id跟商品id丟進回傳
  output.member_id = +member_id;
  output.product_id = +product_id;

  const sql = `SELECT * FROM \`fav\` 
  WHERE \`member_id\`=${db.escape(member_id)} 
  AND \`product_id\` = ${db.escape(product_id)};`;

  let rows = [];
  let fields; // 通常這是不需要取得欄位定義的資料 要看一下就res.json({rows,fields});
  //用await要捕捉錯誤 要像這樣，用.then 就用.catch
  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }

  // 有資料 aka 有收藏
  if (rows[0]) {
    output.alreadyFav = true;
  } else {
    output.alreadyFav = false;
  }
  console.log("rows", rows);
  res.json(output);
});

// 新增商品收藏 資料放在body中
router.post("/add-fav", async (req, res) => {
  const output = {
    member_id: 0,
    product_id: 0,
    addFav: false,
    message: "",
  };

  console.log("body", req.body);
  const member_id = +req.body.member_id;
  const product_id = +req.body.product_id;

  if (!member_id || !product_id) {
    output.message = "會員ID或商品ID undefined 或者 不是數字";
    res.json(output);
  }

  //把會員id跟商品id丟進回傳
  output.member_id = +member_id;
  output.product_id = +product_id;

  const sql2 = "INSERT INTO `fav` SET ?";

  const sql = `INSERT INTO \`fav\`(\`member_id\`, \`product_id\`) 
  VALUES (${db.escape(member_id)},${db.escape(product_id)})`;

  let result;
  try {
    [result] = await db.query(sql2, [req.body]);
    output.addFav = !!result.affectedRows;
  } catch (ex) {
    console.log(ex);
  }

  res.json(output);
});

// 刪除商品收藏的路由
router.delete("/remove-fav", async (req, res) => {
  const output = {
    member_id: 0,
    product_id: 0,
    removeFav: false,
    message: "",
  };

  console.log("body", req.body);
  const member_id = +req.body.member_id;
  const product_id = +req.body.product_id;

  if (!member_id || !product_id) {
    output.message = "會員ID或商品ID undefined 或者 不是數字";
    res.json(output);
  }

  //把會員id跟商品id丟進回傳
  output.member_id = +member_id;
  output.product_id = +product_id;

  const sql = `DELETE FROM fav WHERE member_id=? AND product_id=? `; // 用問號 會自動跳脫，值 按照順序丟到下方陣列 包成陣列是為了應付所有的SQL語法
  const [result] = await db.query(sql, [member_id, product_id]);

  res.json(result);

});
// 以上是收藏

export default router;
