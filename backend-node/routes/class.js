import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const class_type = req.query.class_type ? req.query.class_type : "靜態課程";

  console.log("class_type:", class_type);
  console.log(req.query);

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
  console.log("rows", rows);
  res.json(rows);
});

// 抓所有的開課資料，並且只呈現要的欄位
router.get("/schedule", async (req, res) => {
  // 設定dayjs，設定星期一為一周的第一天
  dayjs.locale("zh-cn", {
    weekStart: 1, // 1代表星期一，0代表星期天
  });

  console.log("query中的場地名稱", req.query.gym_name);
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

    // const test = dayjs(date).day();
    // const test2 = dayjs("2024-04-08").format("dddd");
    // const test3 = dayjs("2024-04-08").startOf("week").format("YYYY-MM-DD");

    const mondayOfTheWeek = dayjs(date).startOf("week").format("YYYY-MM-DD"); //那週的第一天日期
    const sundayOfTheWeek = dayjs(date).endOf("week").format("YYYY-MM-DD"); //那週的最後一天日期

    // console.log(gymName);

    const sql = `SELECT class_schedule_id, start_time, end_time,launch, bookable, max_participant, t_name, gym_name, gym_description, max_contain, class_name, class_img, class_fee, class_type
  FROM \`class_schedule\`
  JOIN \`teacher\` ON class_schedule.teacher_id = teacher.teacher_id
  JOIN \`gym\` ON class_schedule.gym_id = gym.gym_id
  JOIN \`class\` ON  class_schedule.class_id = class.class_id
  WHERE start_time > '${mondayOfTheWeek}'
  AND start_time < '${sundayOfTheWeek}'
  AND gym_name = '${gymName}'
  ORDER BY start_time
  `;

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
  res.json(fullData);
});

router.get("/book/:class_schedule_id", async (req, res) => {
  const result = {
    class_schedule_id: 0,
    max_participant: 0,
    current_participant: 0,
    message: "",
  };
  // 轉數字
  const class_schedule_id = +req.params.class_schedule_id;
  console.log(class_schedule_id);

  if (!class_schedule_id) {
    result.message = "動態路由不是數字";
    return res.json(result);
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
  result.class_schedule_id = class_schedule_id;

  // 數出來是0筆
  if (rows[0]["COUNT(*)"] == 0) {
    result.message = "沒有人預約此課程";
    return res.json(result);
  }

  //有人預約
  result.message = "此課程預約人數>0";
  result.current_participant = rows[0]["COUNT(*)"];


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
console.log(rows2[0]['max_participant']);
result.max_participant = rows2[0]['max_participant']

  res.json(result);
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
