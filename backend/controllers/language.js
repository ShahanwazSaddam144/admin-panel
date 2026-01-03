const express = require("express");
const Language = require("../Database/language");
const protect = require("../middleware/protect");

const router = express.Router();

/* ======================
   CREATE LANGUAGE
====================== */
router.post("/language", protect, async (req, res) => {
  try {
    const {
      LanguageName,
      LanguageDetail,
      Category,
      Difficulty,
      ReleasedYear,
      Frameworks,
      Website,
      UseCases,
    } = req.body;

    if (
      !LanguageName ||
      !LanguageDetail ||
      !Category ||
      !Difficulty ||
      !ReleasedYear ||
      !Frameworks ||
      !Website ||
      !UseCases
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newLanguage = new Language({
      userid: req.user.uid,
      LanguageName,
      LanguageDetail,
      Category,
      Difficulty,
      ReleasedYear,
      Frameworks,
      Website,
      UseCases,
    });

    const savedLanguage = await newLanguage.save();

    return res.status(201).json({
      success: true,
      message: "Chart data saved successfully",
      data: savedLanguage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving language data",
    });
  }
});

/* ======================
   GET USER LANGUAGES
====================== */
router.get("/language", protect, async (req, res) => {
  try {
    const uid = req.user.uid;

    const charts = await Language.find({ userid: uid }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: charts.length,
      charts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ======================
   DELETE LANGUAGE
====================== */
router.delete("/language/:id", protect, async (req, res) => {
  try {
    const chartId = req.params.id;
    const uid = req.user.uid;

    const deletedChart = await Language.findOneAndDelete({
      _id: chartId,
      userid: uid,
    });

    if (!deletedChart) {
      return res.status(404).json({
        success: false,
        message: "Chart not found or you do not have permission to delete it.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chart deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
