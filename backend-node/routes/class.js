import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const class_type = req.query.class_type ? req.query.class_type : "靜態課程";

  // console.log("class_type:", class_type);
  // console.log(req.query);

  const sql = `SELECT * FROM class WHERE \`class_type\` = '${class_type}'`;

  // 下面不一定長這樣
  // promise處理完後，拿到的是陣列 第一個元素會依 SQL 語法不同而異
  // 若是 SQL SELECT，拿到 1.資料的陣列，2.欄位的資料
  let rows = [];
  let fields; // 通常這是不需要取得欄位定義的資料 要看一下就res.json({rows,fields});
  //用await要捕捉錯誤 要像這樣，用.then 就用.catch
  try {
    [rows, fields] = await db.query(sql);
    if (rows.length === 0) {
      [rows, fields] = await db.query(
        `SELECT * FROM class WHERE \`class_type\` = '靜態課程'`
      );
    }
  } catch (ex) {
    console.log(ex);
  }
  // console.log("rows", rows);
  res.json(rows);
});

// 抓區域內的城市
router.get("/city", async (req, res) => {
  const gym_area = req.query.city;
  const sql = `SELECT gym_name FROM \`gym\` WHERE gym_area = '${gym_area}'`;

  let rows = [];
  let fields;
  //用await要捕捉錯誤 要像這樣，用.then 就用.catch
  try {
    [rows, fields] = await db.query(sql);
    if (rows.length === 0) {
      // 找不到城市就跳轉回課程專區
      res.redirect("/class");
      return;
    }
  } catch (ex) {
    console.log(ex);
  }
  console.log("rows", rows);
  res.json(rows);
});

// 抓所有的開課資料，並且只呈現要的欄位
router.get("/schedule", async (req, res) => {
  // 設定dayjs，設定星期一為一周的第一天
  dayjs.locale("zh-cn", {
    weekStart: 1, // 1代表星期一，0代表星期天
  });

  // 至少有給場地才要抓資料

  // fullData才是最後要輸出的資料，除了rows之外，還包含以下設定的
  const fullData = {
    mondayOfTheWeek: "",
    sundayOfTheWeek: "",
    gymName: "",
    year: "",
    month: "",
    dateNumberArray: [],
    gotData: false,
    rows: [],
  };
  if (req.query.gym_name !== undefined) {
    //用變數去接 查詢字串的 date的值 若沒有則設定為當天，並格式化一下
    const date = req.query.date || dayjs().format("YYYY-MM-DD");
    //場館名稱
    const gymName = req.query.gym_name;
    // console.log("gymname",gymName,"date",date);

    // const test = dayjs(date).day();
    // const test2 = dayjs("2024-04-08").format("dddd");
    // const test3 = dayjs("2024-04-08").startOf("week").format("YYYY-MM-DD");

    const mondayOfTheWeek = dayjs(date).startOf("week").format("YYYY-MM-DD"); //那週的第一天日期
    const sundayOfTheWeek = dayjs(date).endOf("week").format("YYYY-MM-DD"); //那週的最後一天日期

    // console.log(gymName);

    // 預設 不篩選 課程類別、課程名稱、老師名稱
    let classTypeSql = 1;
    let classNameSql = 1;
    let teacherNameSql = 1;

    // 若有給課程類別
    if (req.query.class_type_schedule) {
      classTypeSql = `class_type = "${req.query.class_type_schedule}" `;
    }
    // 若有給課程名稱
    if (req.query.class_name) {
      classNameSql = `class_name = "${req.query.class_name}" `;
    }
    // 若有給老師名稱
    if (req.query.teacher_name) {
      teacherNameSql = `teacher_name = "${req.query.teacher_name}" `;
    }
    // classTypeSql = `class_type = "飛輪課程" `
    console.log("type_schedule", req.query.class_type_schedule);
    console.log("classNameSql", classNameSql);

    const sql = `SELECT class_schedule_id, start_time, end_time,launch, bookable, max_participant, teacher_name, gym_name, gym_address, max_contain, class_name, class_img, class_fee, class_type
  FROM \`class_schedule\`
  JOIN \`teacher\` ON class_schedule.teacher_id = teacher.teacher_id
  JOIN \`gym\` ON class_schedule.gym_id = gym.gym_id
  JOIN \`class\` ON  class_schedule.class_id = class.class_id
  WHERE start_time > '${mondayOfTheWeek}'
  AND start_time < '${sundayOfTheWeek}'
  AND gym_name = '${gymName}'
  ORDER BY start_time
  `;

    console.log(sql);
    let rows = [];
    let fields;

    try {
      [rows, fields] = await db.query(sql);
    } catch (ex) {
      console.log(ex);
    }

    // 開始時間跟結束時間 原本抓出來會是UTC時間，要轉成當地時間，再塞回去
    rows.forEach((v, i) => {
      const localStartTime = dayjs(v.start_time).format();
      const localEndTime = dayjs(v.end_time).format();
      v.start_time = localStartTime; // 塞回去
      v.end_time = localEndTime;
    });

    fullData.mondayOfTheWeek = mondayOfTheWeek; // 星期一日期
    fullData.sundayOfTheWeek = sundayOfTheWeek; // 星期日日期
    fullData.gymName = gymName; // 場地名稱
    fullData.year = dayjs(date).format("YYYY"); // 年分

    // 檢查 週一 跟 周日 是否有跨月份
    const startMonth = dayjs(mondayOfTheWeek).format("M"); // 轉成月份
    const endMonth = dayjs(sundayOfTheWeek).format("M"); // 轉成月份
    startMonth === endMonth
      ? (fullData.month = dayjs(date).format("M")) //沒跨月
      : (fullData.month = `${startMonth}-${endMonth}`); //有跨月

    // 把當週所有日期 加到dateNumberArray陣列中 (從星期一開始)
    let dayN = dayjs(mondayOfTheWeek);
    const dateNumberArray = [];

    for (let i = 0; i < 7; i++) {
      // 第N天的日期號碼加到陣列中
      dateNumberArray.push(dayN.format("DD"));
      // 加一天
      dayN = dayN.add(1, "days");
    }
    fullData.dateNumberArray = dateNumberArray;

    fullData.rows = rows; // 資料庫資料
    if (rows[0]) {
      fullData.gotData = true;
    }
  }
  console.log(fullData);
  res.json(fullData);
});

// 獲得開課收藏資訊
router.get("/class_fav", async (req, res) => {
  const output = {
    member_id: 0,
    class_schedule_id: 0,
    alreadyFav: false,
  };

  console.log("query", req.query);
  const member_id = req.query.member_id;
  const class_schedule_id = req.query.class_schedule_id;

  //把會員id跟開課id丟進回船傳
  output.member_id = +member_id;
  output.class_schedule_id = +class_schedule_id;

  const sql = `SELECT * FROM \`fav\` 
  WHERE \`member_id\`=${member_id} 
  AND \`class_schedule_id\` = ${class_schedule_id};`;

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

// 獲得會員的 所有收藏資訊 暫時沒用到
router.get("/all_fav", async (req, res) => {
  const output = {
    member_id: 0,
    class_schedule_ids: [],
    product_ids: [],
    article_ids: [],
  };

  console.log("query", req.query);
  const member_id = req.query.member_id;

  //把會員id跟開課id丟進回船傳
  output.member_id = +member_id;

  const sql = `SELECT * FROM \`fav\` 
  WHERE \`member_id\`=${member_id} ;`;

  let rows = [];
  let fields; // 通常這是不需要取得欄位定義的資料 要看一下就res.json({rows,fields});
  //用await要捕捉錯誤 要像這樣，用.then 就用.catch
  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }

  //把收藏的課程、商品、文章編號 加到陣列中
  rows.forEach((v, i) => {
    if (v.class_schedule_id) {
      output.class_schedule_ids = [
        ...output.class_schedule_ids,
        v.class_schedule_id,
      ];
    }
    if (v.product_id) {
      output.product_ids = [...output.product_ids, v.product_id];
    }
    if (v.article_id) {
      output.article_ids = [...output.article_ids, v.article_id];
    }
  });

  console.log("rows", rows);
  // res.json(rows);
  res.json(output);
});

// 獲得會員的所有課程收藏
router.get("/member_all_fav", async (req, res) => {
  // console.log("query", req.query);
  const member_id = req.query.member_id || 0;

  const sql = `SELECT fav_id, member_id, class_name, start_time, gym_name, fav_time FROM fav 
  JOIN class_schedule ON class_schedule.class_schedule_id = fav.class_schedule_id
  JOIN class ON class_schedule.class_id = class.class_id
  JOIN gym ON class_schedule.gym_id = gym.gym_id
  WHERE member_id = ${member_id}`;

  let rows = [];
  let fields;

  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }

  // 開始時間 原本抓出來會是UTC時間，要轉成當地時間，再塞回去
  rows.map((v, i) => {
    v.start_time = dayjs(v.start_time).format("YYYY-MM-DD HH:mm");
    v.fav_time = dayjs(v.fav_time).format("YYYY-MM-DD HH:mm");
    return v;
  });
  res.json(rows);
});

// 新增課程收藏 資料放在body中
router.post("/add-fav", async (req, res) => {
  const output = {
    member_id: 0,
    class_schedule_id: 0,
    addFav: false,
    message: "",
  };

  console.log("body", req.body);
  const member_id = +req.body.member_id;
  const class_schedule_id = +req.body.class_schedule_id;

  if (!member_id || !class_schedule_id) {
    output.message = "會員ID或開課ID undefined 或者 不是數字";
    res.json(output);
  }

  //把會員id跟開課id丟進回傳
  output.member_id = +member_id;
  output.class_schedule_id = +class_schedule_id;

  const sql2 = "INSERT INTO `fav` SET ?";

  const sql = `INSERT INTO \`fav\`(\`member_id\`, \`class_schedule_id\`) 
  VALUES (${member_id},${class_schedule_id})`;

  let result;
  try {
    [result] = await db.query(sql2, [req.body]);
    output.addFav = !!result.affectedRows;
  } catch (ex) {
    console.log(ex);
  }

  res.json(output);
});

// 刪除課程收藏的路由
router.delete("/remove-fav", async (req, res) => {
  const output = {
    member_id: 0,
    class_schedule_id: 0,
    removeFav: false,
    message: "",
  };

  console.log("body", req.body);
  const member_id = +req.body.member_id;
  const class_schedule_id = +req.body.class_schedule_id;

  if (!member_id || !class_schedule_id) {
    output.message = "會員ID或開課ID undefined 或者 不是數字";
    res.json(output);
  }

  //把會員id跟開課id丟進回傳
  output.member_id = +member_id;
  output.class_schedule_id = +class_schedule_id;

  const sql = `DELETE FROM fav WHERE member_id=? AND class_schedule_id=? `; // 用問號 會自動跳脫，值 按照順序丟到下方陣列 包成陣列是為了應付所有的SQL語法
  const [result] = await db.query(sql, [member_id, class_schedule_id]);

  res.json(result);
  /*
  CRUD 除了select之外的語法，都是給這個
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
}
  */
});

// 獲得預約人數資訊
router.get("/book/:class_schedule_id", async (req, res) => {
  const output = {
    class_schedule_id: 0,
    max_participant: 0,
    current_participant: 0,
    message: "",
  };
  // 轉數字
  const class_schedule_id = +req.params.class_schedule_id;
  console.log(class_schedule_id);

  if (!class_schedule_id) {
    output.message = "動態路由不是數字";
    return res.json(output);
  }

  const sql = `SELECT COUNT(*) FROM \`class_book\` WHERE \`class_schedule_id\`= ${db.escape(
    class_schedule_id
  )}`;
  let rows = [];
  let fields;

  // 抓資料
  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }
  // 開課編號
  output.class_schedule_id = class_schedule_id;

  // 數出來是0筆
  if (rows[0]["COUNT(*)"] == 0) {
    output.message = "沒有人預約此課程";
    return res.json(output);
  }

  //有人預約
  output.message = "此課程預約人數>0";
  output.current_participant = rows[0]["COUNT(*)"];

  // 抓最大開課人數
  const sql2 = `SELECT * FROM \`class_schedule\` WHERE \`class_schedule_id\`= ${db.escape(
    class_schedule_id
  )}`;
  let rows2 = [];
  let fields2;

  // 抓資料
  try {
    [rows2, fields2] = await db.query(sql2);
  } catch (ex) {
    console.log(ex);
  }
  console.log(rows2[0]["max_participant"]);
  output.max_participant = rows2[0]["max_participant"];

  res.json(output);
});

// 動態路由 接收課程名稱
router.get("/:class_id", async (req, res) => {
  // 用變數接收動態路由
  const class_id = req.params.class_id;
  const sql = `SELECT * FROM class WHERE class_id = ${class_id}`;

  let rows = [];
  let fields;

  try {
    [rows, fields] = await db.query(sql);
    // console.log(class_name);
  } catch (ex) {
    console.log(ex);
  }

  // 拿第一個物件
  res.json(rows[0]);
});

export default router;
