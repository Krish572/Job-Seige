const mongoose = require("mongoose");

const RoundSchema = new mongoose.Schema({
    number : {
        type: Number,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    scheduled_at : Date,
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
    feedback_notes: String,
    location: String,
    job_id: {
        type : mongoose.Types.ObjectId,
        ref: "Job",
        required : true
    },
    prep_notes: String
}, {
    timestamps: true
})

module.exports = RoundSchema;