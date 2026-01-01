const express = require("express");
const Charts = require("../Database/language");
const protect = require("../middleware/protect");

const router = express.Router();

router.post("/language", protect, async (req, res) => {
  try {
    const { LanguageName, LanguageDetail } = req.body;

    if (!LanguageName || !LanguageDetail) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newChart = new Charts({
      userid: req.user.uid,
      LanguageName,
      LanguageDetail,
    });

    const savedChart = await newChart.save();

    return res.status(201).json({
      success: true,
      message: "Chart data saved successfully",
      data: savedChart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while saving chart data",
    });
  }
});

router.get("/language", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const charts = await Charts.find({ user: userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: charts.length,
      charts,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.delete("/language/:id", async (req, res) => {
  try {
    const deleteCharts = await Charts.findByIdAndDelete(req.params.id);
    if (!deleteCharts) {
      return res.json({ success: false, message: "Email not Found" });
    }
    res.json({ success: true, message: "Email deleted successfully!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
