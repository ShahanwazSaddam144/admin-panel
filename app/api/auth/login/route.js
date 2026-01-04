import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/app/Database/users";
import isLoggedIn from "@/app/utils/isLoggedIn";
import connectToDatabase from "@/app/utils/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await connectToDatabase();

  const body = await req.json();
  const { email, pass } = body;
  if (!email || !pass)
    return NextResponse.json(
      { message: "Missing credentials" },
      { status: 400 }
    );

  const tokenHeader = req.headers.get("cookie") || "";
  const token = tokenHeader.split("token=")[1]?.split(";")[0];
  if (token && isLoggedIn(token)) return NextResponse.redirect("/main-app");

  try {
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const newToken = jwt.sign(
      { uid: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", newToken, {
      httpOnly: true,
      maxAge: 3600,
      sameSite: "lax",
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
