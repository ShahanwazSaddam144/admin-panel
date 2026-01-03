const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../Database/users");
const protect = require("../middleware/protect");
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET;

/* ======================
   Nodemailer Transport
====================== */
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ======================
   SIGNUP
====================== */
router.post("/signup", async (req, res) => {
  const { name, email, pass, company, role } = req.body;

  if (!name || !email || !pass)
    return res.status(400).json({ message: "Missing credentials" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(pass, 12);

    const user = await User.create({
      name,
      email,
      pass: hashedPassword,
      company,
      role,
    });

    const token = jwt.sign(
      { email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    /* ======================
       SEND WELCOME EMAIL
    ====================== */
    const mailOptions = {
      from: `"Butt Networks" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Welcome to Butt Networks Admin Panel",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 10px;">
          <h1 style="color: #0a58ca; text-align: center;">Welcome, ${user.name}!</h1>
          <p>Thank you for creating an account with <strong>Butt Networks Admin Panel</strong>.</p>
          <ul>
            <li>🔒 Secure login</li>
            <li>📡 Encrypted data</li>
            <li>🛡️ Role-based access</li>
            <li>👀 Real-time monitoring</li>
          </ul>
          <a href="http://localhost:3000"
            style="display:inline-block;background:#0a58ca;color:#fff;padding:12px 20px;border-radius:5px;text-decoration:none;">
            Go to Dashboard
          </a>
        </div>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) console.error("Email failed:", err);
    });

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

/* ======================
   LOGIN
====================== */
router.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass)
    return res.status(400).json({ message: "Missing credentials" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    // 🔐 COMPARE PASSWORD
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { uid: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

/* ======================
   LOGOUT
====================== */
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "Logged out" });
});

/* ======================
   PROTECTED ROUTE
====================== */
router.get("/main-app", protect, (req, res) => {
  res.json({
    heading: "Welcome to",
    message: "Secure Admin-Panel",
    user: req.user.name,
  });
});

/* ======================
   CURRENT USER
====================== */
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select("-pass");
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      company: user.company,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

/* ======================
   DELETE ACCOUNT
====================== */
router.delete("/delete-account", protect, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      email: req.user.email,
    });

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete account" });
  }
});

/* ======================
   EXPORT
====================== */
module.exports = router;
