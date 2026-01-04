// app/models/LanguageDetails.js
import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },

    LanguageName: {
      type: String,
      required: true,
      trim: true,
    },

    LanguageDetail: {
      type: String,
      required: true,
      trim: true,
    },

    Category: {
      type: String,
      required: true,
      trim: true,
    },

    Difficulty: {
      type: String,
      required: true,
      trim: true,
    },

    ReleasedYear: {
      type: Date,
      required: true,
    },

    Frameworks: {
      type: String,
      required: true,
      trim: true,
    },

    Website: {
      type: String,
      required: true,
      trim: true,
    },

    UseCases: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const LanguageDetails =
  mongoose.models.LanguageDetails ||
  mongoose.model("LanguageDetails", languageSchema);
export default LanguageDetails;
