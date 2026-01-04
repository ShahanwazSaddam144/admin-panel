// utils/isLoggedIn.js
import jwt from "jsonwebtoken";

const isLoggedIn = (req, res) => {
  const token = req.cookies?.token;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) return false; // not logged in

  try {
    jwt.verify(token, JWT_SECRET);
    // user is logged in, redirect
    res.writeHead(307, { Location: "/main-app" });
    res.end();
    return true;
  } catch (err) {
    return false;
  }
};

export default isLoggedIn;
