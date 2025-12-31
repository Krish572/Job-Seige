const express = require("express");
const {getUserAnalytics, getAIAnalysis} = require("../controllers/userAnalytics.controller.js");

const router = express.Router({mergeParams: true});

router.get("/", getUserAnalytics);
router.get("/fetchAIAnalysis", getAIAnalysis)

module.exports = router;