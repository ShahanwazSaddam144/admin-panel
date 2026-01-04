import { NextResponse } from "next/server";
import Email from "@/app/Database/mail";
import protect from "@/app/utils/protect";
import connectToDatabase from "@/app/utils/mongodb";

// GET → fetch all emails
export async function GET(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  try {
    const emails = await Email.find({ userid: user.uid }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, count: emails.length, emails });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// DELETE → delete email by ID
export async function DELETE(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // last part of path is email ID

  try {
    const deletedEmail = await Email.findOneAndDelete({
      _id: id,
      userid: user.uid,
    });
    if (!deletedEmail) {
      return NextResponse.json(
        { success: false, message: "Email not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
