// app/utils/protect.js
import verifyToken from "@/app/utils/token";
import { NextResponse } from "next/server";

const protect = async (req) => {
  const token =
    req.cookies?.token ||
    req.headers.get("cookie")?.split("token=")?.[1]?.split(";")?.[0];

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    );
  }

  return decoded; // return the decoded payload
};

export default protect;
