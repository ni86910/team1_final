import express from "express";

const router = express.Router();

// 登出
router.get("/logout", (req, res) => {
  delete req.session.admin; // 移除 admin 這個屬性
  res.redirect("/");
});

export default router;
