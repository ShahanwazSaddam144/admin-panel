import { NextResponse } from "next/server";
import Language from "@/app/Database/language";
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

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); 

  try {
    const deletedChart = await Language.findOneAndDelete({
      _id: id,
      userid: user.uid,
    });

    if (!deletedChart) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Chart not found or you do not have permission to delete it.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Chart deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
