import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";
import authenticate from "./../middlewares/authenticate.js"; // 用於驗證用戶身份

const router = express.Router();

router.get("/", async (req, res) => {
  // 構建 SQL 查詢
  const sql = ` SELECT * FROM article `;

  let rows = [];
  let fields;
  try {
    [rows, fields] = await db.query(sql);
    rows.forEach((v, i) => {
      const localpostdate = dayjs(v.post_date).format("YYYY-DD-MM");
      v.post_date = localpostdate;
    });
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: "內部伺服器錯誤" });
  }

  console.log("rows", rows);
  res.json(rows);
});
// localhost:3001/article/66
// localhost:3001/article/get-fav

// 收藏"/get-fav"
// localhost:3001/article/get-fav?member_id=${XX}&article_id=${YY}
router.get("/get-fav", async (req, res) => {
  const output = {
    member_id: 0,
    article_id: 0,
    alreadyFav: false,
  };

  console.log("query", req.query);
  const member_id = req.query.member_id;
  const article_id = req.query.article_id;

  //把會員id跟文章id丟進回船傳
  output.member_id = +member_id;
  output.article_id = +article_id;

  const sql = `SELECT * FROM \`fav\` 
  WHERE \`member_id\`=${member_id} 
  AND \`article_id\` = ${article_id};`;

  let rows = [];
  let fields;

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

// 新增文章收藏 資料放在body中
router.post("/add-fav", async (req, res) => {
  const output = {
    member_id: 0,
    article_id: 0,
    addFav: false,
    message: "",
  };

  console.log("body", req.body);
  const member_id = +req.body.member_id;
  const article_id = +req.body.article_id;

  if (!member_id || !article_id) {
    output.message = "會員ID或文章ID undefined 或者 不是數字";
    res.json(output);
  }
  //把會員id跟文章id丟進回船傳
  output.member_id = +member_id;
  output.article_id = +article_id;

  const sql2 = "INSERT INTO `fav` SET ?";

  const sql = `INSERT INTO \`fav\`(\`member_id\`, \`article_id\`) 
    VALUES (${member_id},${article_id})`;

  let result;
  try {
    [result] = await db.query(sql2, [req.body]);
    output.addFav = !!result.affectedRows;
  } catch (ex) {
    console.log(ex);
  }

  res.json(output);
});

// 刪除的路由
router.delete("/del-fav", async (req, res) => {
  const output = {
    member_id: 0,
    article_id: 0,
    removeFav: false,
    message: "",
  };

  console.log("body", req.body);
  const member_id = +req.body.member_id;
  const article_id = +req.body.article_id;

  if (!member_id || !article_id) {
    output.message = "會員ID或文章ID undefined 或者 不是數字";
    res.json(output);
  }

  //把會員id跟文章id丟進回船傳
  output.member_id = +member_id;
  output.article_id = +article_id;

  const sql = `DELETE FROM fav WHERE member_id=? AND article_id=? `; // 用問號 會自動跳脫，值 按照順序丟到下方陣列 包成陣列是為了應付所有的SQL語法
  const [result] = await db.query(sql, [member_id, article_id]);

  res.json(result);
});

// 動態路由 接收名稱
router.get("/:article_id", async (req, res) => {
  // 用變數接收動態路由
  const article_id = req.params.article_id;
  const sql = `SELECT * FROM article WHERE article_id = ${article_id} `;
  const sql2 = `SELECT * FROM article_message WHERE article_id = ${article_id} `;
  let rows = [];
  let fields;
  let rows2 = [];
  let fields2;

  try {
    [rows, fields] = await db.query(sql);
    rows.forEach((v, i) => {
      const localpostdate = dayjs(v.post_date).format("YYYY-DD-MM");
      v.post_date = localpostdate;
    });
  } catch (ex) {
    console.log(ex);
  }

  try {
    [rows2, fields2] = await db.query(sql2);
  } catch (ex) {
    console.log(ex);
  }

  // 拿第一個物件
  res.json({ ...rows[0], message: rows2 });
});

// 新增每篇文章留言
router.post("/:article_id", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };

  const sql =
    "INSERT INTO article_message (`article_id`,`message_name`,`message_email`,`message_content`) VALUES (?,?,?,?)";

  const [result] = await db.query(sql, [
    req.body.article_id,
    req.body.message_name,
    req.body.message_email,
    req.body.message_content,
  ]);
  if (result.affectedRows) {
    res.json(output);
  }
});

export default router;
