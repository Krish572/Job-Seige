const mongoose = require("mongoose");
const UserAnalyticsSchema = require("../schemas/userAnalytics.schema.js");

const UserAnalytics = mongoose.model("UserAnalytic", UserAnalyticsSchema);

module.exports = UserAnalytics;