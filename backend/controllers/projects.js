const express = require("express");
const router = express.Router(); 
const Projects = require("../Database/projects");

/* ======================
   CREATE PROJECT
====================== */
router.post('/projects',  async (req, res) => {
    const { ProjectName, ProjectDetail, ProjectLink, StartDate, EndDate, DaysConsumed } = req.body;

    if (!ProjectName || !ProjectDetail || !ProjectLink || !StartDate || !EndDate ) {
        return res.status(400).json({ 
            success: false, 
            message: "Please fill all required fields" 
        });
    }

    try {

        const newProject = new Projects({
            ProjectName,
            ProjectDetail,
            ProjectLink,
            StartDate,
            EndDate,
            DaysConsumed,
        });

        const savedProject = await newProject.save();

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project: savedProject
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while creating project"
        });
    }
});

/* ======================
   GET USER PROJECTS
====================== */
router.get("/projects", async (req, res) => {
  try {
    // Fetch projects linked to the logged-in user
    const projects = await Projects.find({
    }).sort({ createdAt: -1 });

    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ======================
   DELETE PROJECT
====================== */
router.delete('/projects/:id', async (req, res) => {
    try {
        // Assuming you have req.user.id from authentication middleware
        const project = await Projects.findOneAndDelete(req.params.id,{
        });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found or not yours' });
        }

        res.json({ success: true, message: 'Project deleted successfully!' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


module.exports = router;
