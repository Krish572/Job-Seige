const express = require("express");
const {getUserAnalytics} = require("../controllers/userAnalytics.controller.js");

const router = express.Router({mergeParams: true});

router.get("/", getUserAnalytics);

module.exports = router;