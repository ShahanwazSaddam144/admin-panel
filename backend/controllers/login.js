const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();


const userEmail = process.env.User_Email;
const userPass = process.env.User_Pass;

const JWT_SECRET = "super_secret_key_123";

// ======================
// AUTH MIDDLEWARE
// ======================
const protect = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ======================
// LOGIN
// ======================
router.post("/login", (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  if (email !== userEmail || pass !== userPass) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,     // set true in production with HTTPS
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  res.json({ message: "Login successful" });
});

// ======================
// LOGOUT
// ======================
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({ message: "Logged out" });
});

// ======================
// PROTECTED ROUTE
// ======================
router.get("/main-app", protect, (req, res) => {
  res.json({
    message: "Welcome to MainApp",
    user: req.user.email,
  });
});

module.exports = router;
