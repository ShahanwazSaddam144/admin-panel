import { NextResponse } from "next/server";
import Projects from "@/app/Database/projects";
import protect from "@/app/utils/protect";
import connectToDatabase from "@/app/utils/mongodb";

// Helper to parse JSON from POST/DELETE
async function getBody(req) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

export async function POST(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  const body = await getBody(req);
  const {
    ProjectName,
    ProjectDetail,
    ProjectLink,
    StartDate,
    EndDate,
    DaysConsumed,
  } = body;

  if (
    !ProjectName ||
    !ProjectDetail ||
    !ProjectLink ||
    !StartDate ||
    !EndDate
  ) {
    return NextResponse.json(
      { success: false, message: "Please fill all required fields" },
      { status: 400 }
    );
  }

  try {
    const newProject = new Projects({
      userid: user.uid,
      ProjectName,
      ProjectDetail,
      ProjectLink,
      StartDate,
      EndDate,
      DaysConsumed,
      userEmail: user.email,
    });

    const savedProject = await newProject.save();

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        project: savedProject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while creating project",
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  try {
    const projects = await Projects.find({
      userEmail: user.email,
      userid: user.uid,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, projects });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

