const verifyToken = require("../utiles/token");
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  // 1. Added async here
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // 2. Await the verification in case it's a promise
    // Also, ensure your utility actually takes two arguments
    const decoded = await verifyToken(token, JWT_SECRET);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token: Empty payload" });
    }

    req.user = decoded;

    // 3. Always call next() to move to the route handler
    next();
  } catch (error) {
    console.error("JWT Protection Error:", error.message);

    // 4. Ensure a response is sent so the router doesn't hang/crash
    return res.status(403).json({
      message: "Invalid or expired token",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = protect;
