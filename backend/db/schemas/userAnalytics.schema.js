const mongoose = require("mongoose");

const UserAnalyticsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    success_ratio: {
        type: Number,
        default: 0
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
        type: String,
        default: ""
    }
})

UserAnalyticsSchema.pre("save", function (next) {
    if(this.total_applied > 0){
        this.success_ratio = Number((this.offers_received / this.total_applied) * 100).toFixed(2);
    }else{
        this.success_ratio = 0;
    }
    next();
})

module.exports = UserAnalyticsSchema;