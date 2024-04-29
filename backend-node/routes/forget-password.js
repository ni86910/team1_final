import express from 'express'
import transporter from '../configs/mail.js'
import 'dotenv/config.js'

const router = express.Router()

router.get("/reset-password/:token", (req, res) => {
  const token = req.params.token;
  res.render("reset-password", { token });
});

router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    // 驗證 token 的有效性
    // 這裡需要從資料庫中檢查 token 是否有效，以確保它是由你的系統生成的
    // 如果 token 有效，則更新用戶的密碼
    // 假設你的資料庫包含名為 'resetToken' 的欄位用於存儲重設密碼的 token
    // 你可以使用類似的 SQL 查詢來檢查 token 的有效性並更新密碼
    const [user] = await db.query(
      "SELECT * FROM member WHERE resetPasswordToken = ?",
      [token]
    );
    if (user.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // 生成哈希後的新密碼
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 更新用戶的密碼並清除 resetToken
    await db.query(
      "UPDATE member SET m_pwd = ?, ResetToken = NULL WHERE resetPasswordToken = ?",
      [hashedPassword, token]
    );

    // 密碼更新成功，返回成功消息
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/forget-password", async (req, res) => {
  const { m_account } = req.body;

  // 檢查郵箱是否存在於資料庫中
  const [user] = await db.query("SELECT * FROM member WHERE m_account = ?", [
    m_account,
  ]);
  if (!user.length) {
    return res.status(404).json({ message: "User not found" });
  }

  // 生成重設密碼的 token
  const token = bcrypt.hashSync(m_account + new Date().toISOString(), 10);

  // 更新資料庫中的 token
  await db.query("UPDATE member SET resetPasswordToken = ? WHERE m_account = ?", [
    token,
    m_account,
  ]);

  // 發送包含重設密碼連結的郵件給用戶
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fitsu879@gmail.com",
      pass: "yfxx mxgk tuwb hwbn",
    },
  });

  

  const mailOptions = {
    from: '"fitsu" <fitsu879@gmail.com>',
    to: m_account,
    subject: "關於 Fit-U 健康帳戶的重設密碼",
    html: `
        <h2 style="color:black;">您在剛剛提出密碼重設要求，：</h2>

        <a href="http://localhost:3000/member/forget-password?token=${token}" >
        <h4>點我重設密碼</h4>
        </a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to send reset password email" });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Reset password email sent" });
    }
  });
});

export default router;