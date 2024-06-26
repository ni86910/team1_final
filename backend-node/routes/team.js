import express from "express";
import db from "./../utils/mysql2-connect.js";


const router = express.Router();

router.get('/', async(req,res)=>{
    const sql = ` SELECT * FROM teacher `;

    let rows = [];
    let fields;
    try {
        [rows, fields] = await db.query(sql);
    } catch (ex) {
        console.log(ex);
    }
    console.log('rows',rows);
    res.json(rows);
});

export default router;