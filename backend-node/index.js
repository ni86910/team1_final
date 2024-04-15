import express from "express";
// import sales from "./data/sales.json" assert { type: "json" };
// import upload from "./utils/upload-imgs.js";
// import admin2Router from "./routes/admin2.js";
// import abRouter from "./routes/address-book.js";
import session from "express-session";
import mysql_session from "express-mysql-session";
// import moment from "moment-timezone";
import dayjs from "dayjs";
import db from "./utils/mysql2-connect.js";
import cors from "cors";
import bcrypt from "bcryptjs";
// import wsServer from "./routes/ws-chat.js";
// import wsServer from "./routes/ws-draw.js";
import jwt from "jsonwebtoken";
import gymRouter from './routes/gym.js'
import articleRouter from './routes/article.js'
import teamRouter from './routes/team.js'
import contactRouter from './routes/contact.js'
import classRouter from './routes/class.js'
import productRouter from './routes/product.js'
import profileRouter from './routes/profile.js'
import loginRouter from './routes/login.js'
import logoutRouter from './routes/logout.js'
import registerRouter from "./routes/register.js";





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

// 解決跨來源 不能拜訪的問題
const corsOptions = {
  credentials: true, //這行是在設定Access-Control-Allow-Credentials:
  origin: (origin, callback) => {
    console.log({ origin });
    callback(null, true); // 設定為true 允許所有現在origin是誰就允許誰來拜訪
    //這裡的true 使在設定 Access-Control-Allow-Origin: http://127.0.0.1:5500
  },
};
app.use(cors(corsOptions));


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
    } catch (ex) {console.log(ex)}
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

app.use('/gym',gymRouter)

app.use('/article',articleRouter)

app.use('/class',classRouter)

app.use('/product', productRouter)

app.use('/profile', profileRouter)

app.use('/', loginRouter)

app.use('/', logoutRouter)

app.use('/member', registerRouter)

/*

app.use('/', jwtRouter)
app.use('/', jwtdataRouter)
app.use('/', logoutRouter)
*/



// 登入後回傳 JWT
app.post("/login-jwt", async (req, res) => {
  const output = {
    success: false,
    body: req.body,
  };
  const { m_account, m_pwd } = req.body;

  const sql = "SELECT * FROM member WHERE m_account=?";
  const [rows] = await db.query(sql, [m_account]);

  if (!rows.length) {
    // 帳號是錯誤的
    output.message = '帳號錯誤'
    return res.json(output);
  }

  const result = await bcrypt.compare(m_pwd, rows[0].m_pwd);
  output.success = result;
  if (result) {
    const token = jwt.sign(
      {
        member_id: rows[0].member_id,
        m_account,
      },
      process.env.JWT_SECRET
    );

    // 使用 JWT
    output.data = {
      member_id: rows[0].member_id,
      m_account,
      m_name: rows[0].m_name,
      token,
    };
  }
  res.json(output);
});

app.get("/jwt-data", (req, res) => {
  res.json(res.locals.jwt);
});







app.use('/team',teamRouter)

app.use('/contact',contactRouter)

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
