const express = require("express");
const nodemailer = require("nodemailer");
const Email = require("../Database/mail");
const dotenv = require("dotenv");
const protect = require("../middleware/protect");

const router = express.Router();
dotenv.config();

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Pass,
  },
});

// ------------------------------------------------------
// POST → Send Email
// ------------------------------------------------------
router.post("/send-email", protect, async (req, res) => {
  const { to, subject, text, limit } = req.body;

  if (!to || !subject || !text || !limit) {
    return res.json({
      success: false,
      message: "Please provide to, subject, text, and limit",
    });
  }

  // Custom HTML Email Template
  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4facfe;">Hello,</h2>
      <p>${text}</p>

      <a href="https://buttnetworks.com" 
         style="display: inline-block; padding: 10px 20px; margin-top: 20px;
                background-color: #4facfe; color: white; text-decoration: none;
                border-radius: 5px;">Visit Buttnetworks</a>

      <hr style="margin-top: 30px;">
      <p style="font-size: 12px; color: #888;">
        Sent by Shahnawaz Saddam Butt • Buttnetworks
      </p>
    </div>
  `;

  try {
    // Send multiple emails
    for (let i = 0; i < limit; i++) {
      await transporter.sendMail({
        from: process.env.Email_User,
        to,
        subject,
        html: htmlMessage,
      });
    }

    // Save in Database
    const uid = req.user.uid;
    const emailRecord = new Email({ userid: uid, to, subject, text });
    await emailRecord.save();

    res.json({
      success: true,
      message: `Email sent ${limit} times and saved!`,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------
// GET → Fetch all emails from DB
// ------------------------------------------------------
router.get("/emails", protect, async (req, res) => {
  try {
    const userId = req.user.uid;
    const emails = await Email.find({ userid: userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: emails.length,
      emails,
    });
  } catch (err) {
    // 500 status code indicates a server-side error
    res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------
// DELETE → Delete email by ID
// ------------------------------------------------------
router.delete("/emails/:id",protect, async (req, res) => {
  try {
    const uid = req.user.uid
    const deletedEmail = await Email.findByIdAndDelete(req.params.id);

    if (!deletedEmail) {
      return res.json({ success: false, message: "Email not found" });
    }

    res.json({ success: true, message: "Email deleted successfully!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Export Router
module.exports = router;
