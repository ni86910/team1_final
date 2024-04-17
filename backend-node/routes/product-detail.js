import express from "express";
import db from "../utils/mysql2-connect.js";

const router = express.Router();

router.get("/:p_id", async (req, res) => {

  const p_id = req.params.p_id
  const sql = `SELECT * FROM product WHERE product_id = ${p_id}`;

  let rows = [];
  let fields; 
  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }
  res.json(rows);
  
});

// router.get("/detail", async (req, res) => {

//   const sql = "SELECT * FROM product";

//   let rows = [];
//   let fields; 
//   try {
//     [rows, fields] = await db.query(sql);
//   } catch (ex) {
//     console.log(ex);
//   }
//   res.json(rows);
  
// });

export default router;
