const { sendEmail } = require("../services/mailer");

async function notify(req, res) {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "email, subject, and message are required" });
  }

  try {
    await sendEmail(email, subject, message);
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { notify };
