const jwt = require("jsonwebtoken");
const path = require("path");

// This tells dotenv to look one level up (../) for the .env file
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const verifyToken = (token) => {
  // Logic: Use Env variable OR a hardcoded fallback to prevent the "must be provided" error
  const secretKey = process.env.JWT_SECRET || "dev_fallback_secret_123";

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (e) {
    console.error("JWT Verify Error:", e.message);
    return null;
  }
};

module.exports = verifyToken;