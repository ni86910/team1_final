import express from "express";
const router = express.Router();

import db from "./../utils/mysql2-connect.js";

// 產生uuid用
import { v4 as uuidv4 } from "uuid";

// line pay使用npm套件
import { createLinePayClient } from "line-pay-merchant";

// 定義安全的私鑰字串
const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: "development",
});

// 在資料庫建立order資料(需要會員登入才能使用)
router.post("/create-order", async (req, res) => {
  // const userId = req.user.userId;
  const userId = req.body.userId;
  console.log("userId", userId);
  //產生 orderId與packageId
  const orderId = uuidv4();
  const packageId = uuidv4();

  //要傳送給line pay的訂單資訊
  const order = {
    orderId: orderId,
    currency: "TWD",
    amount: req.body.amount,
    packages: [
      {
        id: packageId,
        amount: req.body.amount,
        products: req.body.products,
      },
    ],
    options: { display: { locale: "zh_TW" } },
  };

  // 要儲存到資料庫的order資料 用下面SQL語法
  const dbOrder = {
    id: orderId,
    user_id: userId,
    amount: req.body.amount,
    status: "pending", // 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    order_info: JSON.stringify(order), // 要傳送給line pay的訂單資訊
  };

  const sql = `INSERT INTO line_purchase_order (id, user_id, amount, status, order_info) VALUES (?, ?, ?, ?, ?);`; // 用問號 會自動跳脫，值 按照順序丟到下方陣列

  try {
    const [result] = await db.query(sql, [
      orderId,
      userId,
      req.body.amount,
      "pending",
      JSON.stringify(order),
    ]);
  } catch (e) {
    console.log(e);
  }

  res.json({ status: "success", data: { order } });
});

// 重新導向到line-pay，進行交易(純導向不回應前端)
// 資料格式參考 https://enylin.github.io/line-pay-merchant/api-reference/request.html#example
router.get("/reserve", async (req, res) => {
  if (!req.query.orderId) {
    return res.json({ status: "error", message: "order id不存在" });
  }

  const orderId = req.query.orderId;

  // 設定重新導向與失敗導向的網址 尚未修改
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  };

  // 從資料庫取得訂單資料
  let rows;
  const sql = `SELECT * FROM line_purchase_order WHERE id = ? ;`; // 用問號 會自動跳脫，值 按照順序丟到下方陣列
  try {
    [rows] = await db.query(sql, [orderId]);
  } catch (e) {
    console.log(e);
  }
  const orderRecord = rows[0];

  // order_info記錄要向line pay要求的訂單json
  const order = JSON.parse(orderRecord.order_info);

  console.log(`獲得訂單資料，內容如下：`);
  console.log(order);

  try {
    // 向line pay傳送的訂單資料 向line pay request，並接收response
    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    });

    // 深拷貝一份order資料
    const reservation = JSON.parse(JSON.stringify(order));

    /* 在官方文件的Request API頁面
    returnCode : 結果代碼
    returnMessage : 結果訊息
    info.transactionId : 交易序號
    info.paymentAccessToken : 該代碼在LINE Pay可以代替掃描器使用
    */
    reservation.returnCode = linePayResponse.body.returnCode;
    reservation.returnMessage = linePayResponse.body.returnMessage;
    reservation.transactionId = linePayResponse.body.info.transactionId;
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken;

    console.log(`預計付款資料(Reservation)已建立。資料如下:`);
    console.log(reservation);

    // 在db儲存reservation資料 更新原本的那筆
    const sql2 = `
    UPDATE line_purchase_order SET reservation=?, transaction_id=? WHERE id = ?
    `;
    const result = await db.query(sql2, [
      JSON.stringify(reservation),
      reservation.transactionId,
      orderId,
    ]);

    console.log(result);

    // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
    res.redirect(linePayResponse.body.info.paymentUrl.web);
  } catch (e) {
    console.log(e);
  }
});

// 向Line Pay確認交易結果
// 格式參考: https://enylin.github.io/line-pay-merchant/api-reference/confirm.html#example
router.get("/confirm", async (req, res) => {
  // 網址上需要有transactionId
  const transactionId = req.query.transactionId;

  // 從資料庫取得交易資料
  const sql = `SELECT * FROM line_purchase_order WHERE transaction_id = ? ;`;
  const [rows] = await db.query(sql, [transactionId]);
  //transactionId : 交易序號 之前line pay response回來的
  const dbOrder = rows[0];

  console.log("dbOrder : ", dbOrder);

  // 交易資料 reservation->之前深拷貝一份order資料，並塞入line pay的一些回傳值
  const transaction = JSON.parse(dbOrder.reservation);

  console.log("交易資料", transaction);
  // 交易金額
  const amount = transaction.amount;
  try {
    // 最後確認交易
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: "TWD",
        amount: amount,
      },
    });

    // linePayResponse.body回傳的資料
    console.log(linePayResponse);

    // status: 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    let status = "paid";

    // 0000代表成功
    if (linePayResponse.body.returnCode !== "0000") {
      status = "fail";
    }

    // 更新資料庫的訂單狀態
    const sql2 = `UPDATE line_purchase_order SET status = ?, return_code = ?, confirm = ? WHERE id = ?`;
    const result = await db.query(sql2, [
      status,
      linePayResponse.body.returnCode,
      JSON.stringify(linePayResponse.body),
      dbOrder.id,
    ]);

    console.log(result);
    return res.json({ status: "success", data: linePayResponse.body });
  } catch (error) {
    return res.json({ status: "fail", data: error.data });
  }
});

router.get("/check-transaction", async (req, res) => {
  const transactionId = req.query.transactionId;
  try {
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId: transactionId,
      params: {},
    });

    // 範例:
    // {
    //   "body": {
    //     "returnCode": "0000",
    //     "returnMessage": "reserved transaction."
    //   },
    //   "comments": {}
    // }
    res.json(linePayResponse.body);
  } catch (e) {
    res.json({ error: e });
  }
});

export default router;
