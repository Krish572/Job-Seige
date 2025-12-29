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
        enum: ["pending", "cleared", "rejected"],
        default: "pending"
    },
    is_interview: {
        type: Boolean,
        default: false
    },
    feedback_notes: String,
    location: String,
    job_id: {
        type : mongoose.Types.ObjectId,
        ref: "Job",
        required : true
    },
    prep_notes: String,
    ai_context: {
        type : String,
        default : ""
    }
}, {
    timestamps: true
})

module.exports = RoundSchema;