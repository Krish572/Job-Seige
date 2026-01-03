const express = require("express");
const {
  getUserAnalytics,
  getAIAnalysis,
  generateAIAnalysis,
} = require("../controllers/userAnalytics.controller.js");

const router = express.Router({ mergeParams: true });

router.get("/", getUserAnalytics);
router.get("/fetchAIAnalysis", getAIAnalysis);
router.post("/generate-ai-analysis", generateAIAnalysis);

module.exports = router;
