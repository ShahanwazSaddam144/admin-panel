import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Email from "@/app/Database/mail";
import protect from "@/app/utils/protect";
import connectToDatabase from "@/app/utils/mongodb";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Pass,
  },
});

export async function POST(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  const body = await req.json();
  const { to, subject, text, limit } = body;

  if (!to || !subject || !text || !limit) {
    return NextResponse.json(
      {
        success: false,
        message: "Please provide to, subject, text, and limit",
      },
      { status: 400 }
    );
  }

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4facfe;">Hello,</h2>
      <p>${text}</p>
      <a href="https://buttnetworks.com" 
         style="display: inline-block; padding: 10px 20px; margin-top: 20px;
                background-color: #4facfe; color: white; text-decoration: none;
                border-radius: 5px;">Visit Buttnetworks</a>
      <hr style="margin-top: 30px;">
      <p style="font-size: 12px; color: #888;">
        Sent by Shahnawaz Saddam Butt • Buttnetworks
      </p>
    </div>
  `;

  try {
    // Send multiple emails
    for (let i = 0; i < limit; i++) {
      await transporter.sendMail({
        from: process.env.Email_User,
        to,
        subject,
        html: htmlMessage,
      });
    }

    // Save in DB
    const emailRecord = new Email({ userid: user.uid, to, subject, text });
    await emailRecord.save();

    return NextResponse.json({
      success: true,
      message: `Email sent ${limit} times and saved!`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
