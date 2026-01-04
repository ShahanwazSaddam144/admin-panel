// app/models/Projects.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userid: {
      required: true,   // fixed typo: `require` -> `required`
      type: String,
    },
    ProjectName: String,
    ProjectDetail: String,
    ProjectLink: String,
    StartDate: Date,
    EndDate: Date,
    DaysConsumed: Number,
    userEmail: String,
  },
  { timestamps: true }
);

// export a cached model (prevents OverwriteModelError in serverless / hot reload)
const Projects = mongoose.models.Projects || mongoose.model("Projects", projectSchema);
export default Projects;
