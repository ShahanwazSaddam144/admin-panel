const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

export const verifyToken(req, res, next)