import express from "express";
import sales from "./data/sales.json" assert { type: "json" };
import upload from "./utils/upload-imgs.js";
import admin2Router from "./routes/admin2.js";
import abRouter from "./routes/address-book.js";
import session from "express-session";
import mysql_session from "express-mysql-session";
import moment from "moment-timezone";
import dayjs from "dayjs";
import db from "./utils/mysql2-connect.js";
import cors from "cors";
import bcrypt from "bcryptjs";
// import wsServer from "./routes/ws-chat.js";
import wsServer from "./routes/ws-draw.js";
import jwt from "jsonwebtoken";

// 建立一個session可以儲存的地方
const MysqlStore = mysql_session(session);
const sessionStore = new MysqlStore({}, db);

// 建立web server物件
const app = express();


// *** Top level middlewares
// true: 使用 qs 套件做為解析器的核心
// false: 使用 body-parser 自己的解析器
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "kidfk89345309ULKUJGJHiuer",
    store: sessionStore,
    /*
    cookie: {
      maxAge: 1200_000, // 單位是毫秒
    }
    */
  })
);

// 自訂頂層的中介軟體
app.use((req, res, next) => {

  const authorization = req.get("Authorization"); // 取得某個 header
  if (authorization && authorization.indexOf("Bearer ") === 0) {
    const token = authorization.slice(7); // 去掉 "Bearer "

    // JWT 解密
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.jwt = payload; // 透過 res 往下傳
    } catch (ex) {}
  }
  /*
  // 測試時使用
  res.locals.jwt = {
    id: 25,
    account: "fake@test.com",
  };
  */
  next(); // 流程往下進行
});


// 路由 (routes) 設定






// *** 路由放在此段之前 ***
// 設定靜態內容的資料夾
app.use(express.static("public"));

// app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));

// 404 頁面
// *** 此段放在所有路由設定的後面 ***
app.use((req, res) => {
  res.status(404).send("<h2>是不是走錯路了</h2>");
});

const port = process.env.WEB_PORT || 3002;
app.listen(port, () => {
  console.log(`使用通訊埠: ${port}`);
});
