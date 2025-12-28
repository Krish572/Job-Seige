const mongoose = require("mongoose");
const RoundSchema = require("../schemas/round.schema.js");

const Round = mongoose.model("Round", RoundSchema);

module.exports = Round

