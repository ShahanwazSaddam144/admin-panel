const verifyToken = require('../utiles/token')
const JWT_SECRET = process.env.JWT_SECRET;


const protect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token,JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    console.log(e)
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = protect;
