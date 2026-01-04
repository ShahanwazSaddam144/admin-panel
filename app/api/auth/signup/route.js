import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/app/Database/users";
import isLoggedIn from "@/app/utils/isLoggedIn";
import connectToDatabase from "@/app/utils/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  await connectToDatabase();

  const body = await req.json();
  const { name, email, pass, company, role } = body;

  if (!name || !email || !pass)
    return NextResponse.json(
      { message: "Missing credentials" },
      { status: 400 }
    );

  // Redirect if already logged in
  const tokenHeader = req.headers.get("cookie") || "";
  const token = tokenHeader.split("token=")[1]?.split(";")[0];
  if (token && isLoggedIn(token)) {
    return NextResponse.redirect("/main-app");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(pass, 12);

    const user = await User.create({
      name,
      email,
      pass: hashedPassword,
      company,
      role,
    });

    const newToken = jwt.sign(
      { uid: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send cookie
    const res = NextResponse.json({ message: "Signup successful" });
    res.cookies.set("token", newToken, {
      httpOnly: true,
      maxAge: 3600,
      sameSite: "lax",
    });

    // Send welcome email
    transporter.sendMail({
      from: `"Butt Networks" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Welcome to Butt Networks Admin Panel",
      html: `<h2>Welcome, ${user.name}!</h2><p>Your admin panel account is ready.</p><a href="http://localhost:3000">Go to Dashboard</a>`,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Signup failed" }, { status: 500 });
  }
}
