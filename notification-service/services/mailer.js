require('dotenv').config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});


async function sendEmail(to, subject, text, html = null) {
  try {
    const mailOptions = {
      from: `"Airline Management ✈️" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || `<h1>${subject}</h1><p>${text}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}

module.exports = { sendEmail };
