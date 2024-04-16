import express from "express";
import db from "./../utils/mysql2-connect.js";
import dayjs from "dayjs";
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from './../db-helpers/db-tool.js'
import authenticate from './../middlewares/authenticate.js'
const router = express.Router();
const { Favorite } = db

router.get('/', async(req,res)=>{
    // 構建 SQL 查詢
    const sql = ` SELECT * FROM article `;
    

    let rows = [];
    let fields;
    try {
        [rows, fields] = await db.query(sql);
        rows.forEach((v,i) => {
          const localpostdate = dayjs(v.post_date).format('YYYY-DD-MM');
          v.post_date = localpostdate;
        })
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ error: '內部伺服器錯誤' });
    }
   

    console.log('rows',rows);
    res.json(rows);
});

// 動態路由 接收名稱
router.get("/:article_id", async (req, res) => {
    // 用變數接收動態路由
    const article_id = req.params.article_id
    const sql = `SELECT * FROM article WHERE article_id = ${article_id} `;
    const sql2 = `SELECT * FROM article_message WHERE article_id = ${article_id} `;
    let rows = [];
    let fields;
    let rows2 = [];
    let fields2;
  
    try {
      [rows, fields] = await db.query(sql);
      rows.forEach((v,i) => {
        const localpostdate = dayjs(v.post_date).format('YYYY-DD-MM');
        v.post_date = localpostdate;
      })
    } catch (ex) {
      console.log(ex);
    }

    try {
      [rows2, fields2] = await db.query(sql2);

    } catch (ex) {
      console.log(ex);
    }
    
    // 拿第一個物件
    res.json({...rows[0],message:rows2});
    
  });

  // 新增每篇文章留言
  router.post("/:article_id", async (req,res) => {
    const output = {
      success: false,
      postData: req.body,
      error: "",
      code: 0,
      };

      const sql = "INSERT INTO article_message (`article_id`,`message_name`,`message_email`,`message_content`) VALUES (?,?,?,?)";

      const [result] = await db.query(sql, [
        req.body.article_id,
        req.body.message_name,
        req.body.message_email,
        req.body.message_content,
      ]);
      if (result.affectedRows) {
        res.json(output);
      }
  })

  // 獲得某會員id的有加入到我的最愛清單中的商品id們
// 此路由只有登入會員能使用
router.get('/:article_id', authenticate, async (req, res) => {
  const userId = res.locals.jwt.id

const pids = await Favorite.findAll({
    attributes: ['pid'],
    where: {
      uid: userId,
    },
    raw: true, //只需要資料
})

  // 將結果中的pid取出變為一個純資料的陣列
  const favorites = pids.map((v) => v.pid)

  res.json({ status: 'success', data: { favorites } })
})

router.put('/:article_id', authenticate, async (req, res, next) => {
  const pid = getIdParam(req)
  const uid = req.user.id

  const existFav = await Favorite.findOne({ where: { pid, uid } })
  if (existFav) {
    return res.json({ status: 'error', message: '資料已經存在，新增失敗' })
  }

  const newFav = await Favorite.create({ pid, uid })

  // console.log(newFav.id)

  // 沒有新增到資料
  if (!newFav.id) {
    return res.json({
      status: 'error',
      message: '新增失敗',
    })
  }

  return res.json({ status: 'success', data: null })
})

router.delete('/:article_id', authenticate, async (req, res, next) => {
  const pid = getIdParam(req)
  const uid = req.user.id

  const affectedRows = await Favorite.destroy({
    where: {
      pid,
      uid,
    },
  })

  // 沒有刪除到任何資料 -> 失敗或沒有資料被刪除
  if (!affectedRows) {
    return res.json({
      status: 'error',
      message: '刪除失敗',
    })
  }

  // 成功
  return res.json({ status: 'success', data: null })
})
export default router;