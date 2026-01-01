const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    userid:{
      require:true,
      type:String
    }
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
