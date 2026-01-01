const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userid:{
      require:true,
      type:String
    },
    ProjectName: String,
    ProjectDetail: String,
    ProjectLink: String,
    StartDate: Date,
    EndDate: Date,
    DaysConsumed: Number,
    userEmail: String, // ← added
  },
  { timestamps: true }
);

module.exports = mongoose.model("Projects", projectSchema);
