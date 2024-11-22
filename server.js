require('dotenv').config();  // dotenv로 환경변수 로드

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;  // 환경변수 PORT 사용

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// 이메일 전송 기능
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,  // .env 파일에서 EMAIL_USER 사용
      pass: process.env.EMAIL_PASS,  // .env 파일에서 EMAIL_PASS 사용
    },
  });
  const emailMessage = `이름: ${name}\n\n${message}`;

  const mailOptions = {
    from: email,
    to: "sa2840@naver.com",  // 받는 사람의 이메일
    subject: `New message from ${email}`,
    text: emailMessage,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to send email.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
