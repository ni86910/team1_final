import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";
import path from 'path'
import multer from 'multer'

const router = express.Router();

// multer的設定值 - START
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // 存放目錄
    callback(null, 'public/avatar/')
  },
  filename: function (req, file, callback) {
    // 經授權後，req.user帶有會員的id
    const newFilename = req.body.member_id
    // 新檔名由表單傳來的req.body.newFilename決定
    callback(null, newFilename + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
// multer的設定值 - END

//取資料
router.get("/", async (req, res) => {
  console.log('jwt=',res.locals.jwt)
    const sql = `SELECT * FROM \`member\` WHERE m_account ='${res.locals.jwt.m_account}'`; 

    try {
      const [rows, fields] = await db.query(sql);
      if (rows.length > 0) {
        // 將 ISO 8601 格式的日期轉換為 "yyyy-MM-dd" 格式
        const formattedDate = new Date(rows[0].birthday).toISOString().split('T')[0];
        rows[0].birthday = formattedDate;
        
        res.json(rows[0]);
      } else {
        res.status(204).json({ error: "No member data found" }); 
      }
    } catch (ex) {
      console.log(ex);
      res.status(200).json({ error: "Internal Server Error" }); 
    }
  });

  // 修改資料的表單
router.get("/profile/:member_id", async (req, res) => {
  const member_id = +req.params.member_id || 0;
  if (!member_id) {
    return res.redirect("/profile");
  }
  const sql = `SELECT * FROM member WHERE member_id=${member_id}`;
  const [rows] = await db.query(sql);
  if (!rows.length) {
    return res.redirect("/profile");
  }
  const r = rows[0];
  const d = dayjs(r.birthday);
  r.birthday = d.isValid() ? d.format("YYYY-MM-DD") : "";
  res.render("member/profile", r);
});


// POST - 可同時上傳與更新會員檔案用，使用multer(設定值在此檔案最上面)
router.post(
  '/upload/avatar',
  upload.single('avatar'), // 上傳來的檔案(這是單個檔案，表單欄位名稱為avatar)
  async function (req, res) {
    // req.file 即上傳來的檔案(avatar這個檔案)
    // req.body 其它的文字欄位資料…
    // console.log(req.file, req.body)

    if (req.file) {
      const id = req.body.member_id
      const data = { avatar: req.file.filename }
      const sqlAvatar = "UPDATE `member` SET avatar = ? WHERE member_id = ?";
      try {
        // 執行 SQL 時最好做錯誤處理
        const [resultAvatar] = await db.query(sqlAvatar, [req.file.filename, id]);
        // 檢查是否成功更新資料
        if (resultAvatar.affectedRows > 0) {
          console.log("檔案名稱已成功儲存到資料表member的avatar欄位中");
        } else {
          console.log("無法更新資料表member的avatar欄位");
        }
      } catch(ex){
        console.error("更新資料表member的avatar欄位時出錯:", ex);
      }

      return res.json({
        status: 'success',
        data: { avatar: req.file.filename },
      })
    } else {
      return res.json({ status: 'fail', data: null })
    }
  }
)


// 編輯更新
router.put("/:member_id", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };
  console.log(req.body);

  let member_id = +req.params.member_id || 0;

  let birthday = dayjs(req.body.birthday, "YYYY-MM-DD", true); // dayjs 物件
  // 置換處理過的值
  req.body.birthday = birthday.isValid() ? birthday.format("YYYY-MM-DD") : null;

  // TODO: 資料格式檢查
  const sql = "UPDATE `member` SET ? WHERE member_id=?";
  try {
    // 執行 SQL 時最好做錯誤處理
    const [result] = await db.query(sql, [req.body, member_id]);

    output.success = !!(result.affectedRows && result.changedRows);
  } catch(ex){
    output.error = ex.toString();
  }
  res.json(output);
});

router.get("/zod", (req, res) => {
  const strSchema = z.string().min(4, { message: "請填寫長度四以上的字串" });

  res.json({
    result: strSchema.safeParse("12"),
  });
});

  export default router;
