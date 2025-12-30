const mongoose = require("mongoose");


const aiInfo =  new mongoose.Schema({
    context : {
        type: String,
    },
    last_ai_snapshot: {
        total_applied: Number,
        offers_received: Number,
        total_interviews: Number,
        total_rounds_attended: Number,
        total_rounds_cleared:Number,
    }
})

const UserAnalyticsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    total_applied: {
        type: Number,
        default: 0
    },

    total_interviews: {
        type: Number,
        default: 0
    },

    offers_received: {
        type: Number,
        default: 0
    },

    total_rounds_attended: {
        type: Number,
        default: 0
    },

    total_rounds_cleared: {
        type: Number,
        default: 0
    },

    ai_context: {
        type: aiInfo,
        default: () => ({
            context: "",
            last_ai_snapshot: {
                total_applied: 0,
                offers_received: 0,
                total_interviews: 0,
                total_rounds_attended: 0,
                total_rounds_cleared: 0
            }
        })
    }
}, {
    timestamps: true
})





module.exports = UserAnalyticsSchema;