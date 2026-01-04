import { NextResponse } from "next/server";
import protect from "@/app/utils/protect";
import User from "@/app/Database/users";
import connectToDatabase from "@/app/utils/mongodb";

export async function DELETE(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await User.findByIdAndDelete(user.uid);

    const res = NextResponse.json({ message: "Account deleted successfully" });
    res.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "lax",
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to delete account" },
      { status: 500 }
    );
  }
}
