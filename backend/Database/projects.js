const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    ProjectName: {
      type: String,
      required: true,
      trim: true,
    },

    ProjectDetail: {
      type: String,
      required: true,
      trim: true,
    },

    ProjectLink: {
      type: String,
      required: true,
    },

    StartDate: {
      type: Date,
      required: true,
    },

    EndDate: {
      type: Date,
      required: true,
    },

    DaysConsumed: {
      type: Number,
      required: true,
    },

    email:{
    type: String,
    required: true,
  },
  },

  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Project", projectSchema);
