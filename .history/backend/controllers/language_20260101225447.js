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
    const uid = req.user.uid;
    const charts = await Charts.find({ userid: uid }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: charts.length,
      charts,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.delete("/language/:id", protect, async (req, res) => {
  try {
    const chartId = req.params.id;
    const userId = req.user.id;

    const deletedChart = await Charts.findOneAndDelete({
      _id: chartId,
      userid: userId,
    });


    if (!deletedChart) {
      return res.status(404).json({
        success: false,
        message: "Chart not found or you do not have permission to delete it.",
      });
    }

    res.json({ success: true, message: "Chart deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
