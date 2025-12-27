const mongoose = require("mongoose");
const JobSchema = require("../schemas/job.schema.js");

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
