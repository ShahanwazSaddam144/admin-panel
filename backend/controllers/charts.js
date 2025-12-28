const express = require("express");
const Charts = require("../Database/charts");

const router = express.Router();

router.post("/charts", async (req, res) => {
  try {
    const { LanguageName, LanguageDetail } = req.body;

    if (!LanguageName || !LanguageDetail) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newChart = new Charts({
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

router.get("/charts", async (req, res) => {
  try {
    const charts = await Charts.find().sort({ createdAt: -1 });
    res.json({ success: true, charts });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
