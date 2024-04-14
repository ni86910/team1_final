import express from "express";
import db from "./../utils/mysql2-connect.js";

const router = express.Router();

router.post('/', async (req,res) => {
    const output = {
        success: false,
        postData: req.body,
        error: "",
        code: 0,
        };

        // TODO: 資料格式檢查
        // const formSchema = z.object({
        //     name: z.string().min(2, { message: "名字長度要大於等於 2" }),
        //     email: z.string().email({ message: "請填寫正確的 email" }),
        // });

        // const parseResult = formSchema.safeParse(req.body);
        // if (!parseResult.success) {
        //     output.issues = parseResult.error.issues;
        //     return res.json(output);
        // }

    const sql = "INSERT INTO consult (`consult_type`,`consult_name`,`consult_email`,`request`) VALUES (?,?,?,?)";
    const [result] = await db.query(sql, [
        req.body.consult_type,
        req.body.consult_name,
        req.body.consult_email,
        req.body.request,
        ]);
    if (result.affectedRows) {
    res.json(output);
    }
})

export default router;