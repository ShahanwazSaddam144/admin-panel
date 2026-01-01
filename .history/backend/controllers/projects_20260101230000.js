const express = require("express");
const router = express.Router();
const Projects = require("../Database/projects");
const protect = require("../middleware/protect");

/* ======================
   CREATE PROJECT
====================== */
router.post("/projects", protect, async (req, res) => {
  const {
    ProjectName,
    ProjectDetail,
    ProjectLink,
    StartDate,
    EndDate,
    DaysConsumed,
  } = req.body;

  if (
    !ProjectName ||
    !ProjectDetail ||
    !ProjectLink ||
    !StartDate ||
    !EndDate
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  }

  try {
    const newProject = new Projects({
      userid: req.user.uid,
      ProjectName,
      ProjectDetail,
      ProjectLink,
      StartDate,
      EndDate,
      DaysConsumed,
      userEmail: req.user.email,
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while creating project",
    });
  }
});

/* ======================
   GET USER PROJECTS
====================== */
router.get("/projects", protect, async (req, res) => {
  try {
    const uid = req.user.uid;
    const projects = await Projects.find({
      userEmail: req.user.email,
      userid: uid,
    }).sort({ createdAt: -1 });

    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/projects/:id", protect, async (req, res) => {
  try {
    const project = await Projects.findOneAndDelete({
      _id: req.params.id,
      userEmail: req.user.email, // ensure user can only delete their projects
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found or not yours" });
    }

    res.json({ success: true, message: "Project deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
