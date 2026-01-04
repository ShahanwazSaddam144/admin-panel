import { NextResponse } from "next/server";
import Language from "@/app/Database/language";
import protect from "@/app/utils/protect";
import connectToDatabase from "@/app/utils/mongodb";

// Helper to parse JSON body
async function getBody(req) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

// ------------------------
// CREATE LANGUAGE
// ------------------------
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
    LanguageName,
    LanguageDetail,
    Category,
    Difficulty,
    ReleasedYear,
    Frameworks,
    Website,
    UseCases,
  } = body;

  if (
    !LanguageName ||
    !LanguageDetail ||
    !Category ||
    !Difficulty ||
    !ReleasedYear ||
    !Frameworks ||
    !Website ||
    !UseCases
  ) {
    return NextResponse.json(
      { success: false, message: "Please fill all fields" },
      { status: 400 }
    );
  }

  try {
    const newLanguage = new Language({
      userid: user.uid,
      LanguageName,
      LanguageDetail,
      Category,
      Difficulty,
      ReleasedYear,
      Frameworks,
      Website,
      UseCases,
    });

    const savedLanguage = await newLanguage.save();

    return NextResponse.json(
      {
        success: true,
        message: "Chart data saved successfully",
        data: savedLanguage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error while saving language data" },
      { status: 500 }
    );
  }
}

// ------------------------
// GET USER LANGUAGES
// ------------------------
export async function GET(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  try {
    const charts = await Language.find({ userid: user.uid }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, count: charts.length, charts });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// ------------------------
// DELETE LANGUAGE
// ------------------------
export async function DELETE(req) {
  await connectToDatabase();

  const user = await protect(req);
  if (!user)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // last segment = language ID

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
