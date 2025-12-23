const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    ProjectName: {type: String, required: true},
    ProjectDetail: {type: String, required: true},
    ProjectLink: {type: String, required: true},
    Date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Project', projectSchema);