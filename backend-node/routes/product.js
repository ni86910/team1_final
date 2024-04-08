import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();
//router.get("/") //訪問product

router.get("/product-list", async (req, res) => {
    const sql = "SELECT * FROM product";

    let rows = [];
    let fields; 
    try {
      [rows, fields] = await db.query(sql);
    } catch (ex) {
      console.log(ex);
    }
    res.json(rows);
  });
  
  export default router;