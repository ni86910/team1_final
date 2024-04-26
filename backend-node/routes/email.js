// import express from "express";
// import "dotenv/config.js"; // 存取`.env`設定檔案使用

// const router = express.Router();

// /* 寄送 email 的路由 */
// router.get("/send", function (req, res, next) {
//   // email 內容
//   const mailOptions = {
//     from: `"fitsu"<${process.env.SMTP_TO_EMAIL}>`,
//     to: "oceanoia@gmail.com",
//     subject: "測試信件",
//     text: `你好，\r\n此封信件為通知訂單已完成。\r\n\r\n敬上\r\nFITSU團隊`,
//   };
// });

// export default router;

import express from 'express'
import transporter from '../configs/mail.js'
import 'dotenv/config.js'

const router = express.Router()

// email內容
const mailOptions = {
    from: `"fitsu"<${process.env.SMTP_TO_EMAIL}>`,
    to: "oceanoia@gmail.com",
    subject: "訂單成立",
    text: `你好，\r\n此封信件為通知訂單已完成。\r\n\r\n敬上\r\nFITSU團隊`,
}

/* 寄送email的路由 */
router.get('/send', function (req, res, next) {
  // 寄送
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      // 失敗處理
      return res.status(400).json({ status: 'error', message: err })
    } else {
      // 成功回覆的json
      return res.json({ status: 'success', data: null })
    }
  })
})

export default router;