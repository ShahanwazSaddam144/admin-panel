const express = require("express");
const verifyToken = require("../utiles/token");
const User = require("../Database/users");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

/* ======================
   AUTH MIDDLEWARE
====================== */
const protect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token,JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

router.post("/signup", async (req, res) => {
  const { name, email, pass } = req.body;
  if (!name || !email || !pass)
    return res.status(400).json({ message: "Missing credentials" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const user = await User.create({ name, email, pass });

    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    res.json({ message: "Signup successful" });
  } catch (err) {
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
    const user = await User.findOne({ email, pass });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { uid: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    res.json({ message: "Login successful" });
  } catch {
    console.log(error)
    res.status(500).json({ message: "Login failed" });
  }
});

/* ======================
   LOGOUT
====================== */
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "lax" });
  res.json({ message: "Logged out" });
});

/* ======================
   PROTECTED ROUTE
===================== */
router.get("/main-app", protect, (req, res) => {
  res.json({
    heading: "Welcome to",
    message: "Secure Admin-Panel",
    user: req.user.name,
  });
});

/* ======================
   CURRENT USER (/me)
====================== */
router.get("/me", protect, async (req, res) => {
  try {
    // req.user is set by protect middleware (decoded JWT)
    const user = await User.findOne({ email: req.user.email }).select("-pass"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

/* ======================
   EXPORT
====================== */
module.exports = router;
