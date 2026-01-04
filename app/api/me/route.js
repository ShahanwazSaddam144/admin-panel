import { NextResponse } from "next/server";
import protect from "@/app/utils/protect";
import User from "@/app/Database/users";
import connectToDatabase from "@/app/utils/mongodb";

export async function GET(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await User.findById(user.uid).select("-pass");
    if (!dbUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(dbUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
