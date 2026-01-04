import { NextResponse } from "next/server";
import protect from "@/app/utils/protect";
import connectToDatabase from "@/app/utils/mongodb";

export async function GET(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    heading: "Welcome to",
    message: "Secure Admin Panel",
    user: user.name,
  });
}
