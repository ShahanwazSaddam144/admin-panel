import { NextResponse } from "next/server";

export function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("token", "", { httpOnly: true, maxAge: 0, sameSite: "lax" });
  return res;
}
