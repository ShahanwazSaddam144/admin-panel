const jwt = require("jsonwebtoken");
require('dotenv').config(); // Loaded here too to be safe

// Use the SECRET from env, or fall back to a hardcoded string
const SECRET = process.env.JWT_SECRET || "fallback_secret_key_123";

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (e) {
    console.error("JWT Verify Error:", e.message);
    return null;
  }
};

module.exports = verifyToken;