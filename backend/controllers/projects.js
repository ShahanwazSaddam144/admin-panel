const express = require("express");
const router = express.Router(); 
const Projects = require("../Database/projects");

router.post('/projects', async (req, res) => {
    const { ProjectName, ProjectDetail, ProjectLink } = req.body;

    if (!ProjectName || !ProjectDetail || !ProjectLink) {
        return res.status(400).json({ 
            success: false, 
            message: "Please fill all fields" 
        });
    }

    try {
        const newProject = new Projects({
            ProjectName,
            ProjectDetail,
            ProjectLink
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

router.get('/projects', async(req,res)=>{
    try{
        const projects = await Projects.find().sort({createdAt: -1});
        res.json({ success: true, projects});
    } catch(err){
        res.json({ success: false, message: err.message });
    }
});

router.delete('/projects/:id', async (req,res)=>{
    try{
        const deleteProject = await Projects.findByIdAndDelete(req.params.id);
        if(!deleteProject){
            return res.json({ success: false, message: 'Email not found' });
        }
        res.json({ success: true, message: 'Email deleted successfully!' });
    } catch(err){
        res.json({ success: false, message: err.message });
    }
});

module.exports = router;
