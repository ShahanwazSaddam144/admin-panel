import { NextResponse } from "next/server";
import Projects from "@/app/Database/projects";
import protect from "@/app/utils/protect";
import connectToDatabase from "@/app/utils/mongodb";

export async function DELETE(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  // extract project ID from URL
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    const project = await Projects.findOneAndDelete({
      _id: id,
      userid: user.uid,
    });
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found or not yours" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
