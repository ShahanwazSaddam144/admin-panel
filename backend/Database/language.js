const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("LanguageDetails", languageSchema);
