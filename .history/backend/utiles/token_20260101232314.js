const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET 

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