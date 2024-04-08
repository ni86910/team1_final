import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

const getGymData = async (req, res) => {
    let keyword = req.query.keyword || "";

    let subQuery = `
  (
    SELECT * FROM gym WHERE gym_sid=${gym_sid}
  ) pl `;
}

router.use((req, res, next)=>{


    next();
})

router.get("/", async (req, res) => {
    res.locals.pageName = "gym-list";
    res.locals.title = "場地一覽 — " + res.locals.title;
  
    const data = await getListData(req, res);
    if (data.redirect) {
      return res.redirect(data.redirect);
    }
  });

export default router;