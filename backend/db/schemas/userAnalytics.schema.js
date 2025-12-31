const mongoose = require("mongoose");

const aiInfo = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["idle", "processing", "ready", "failed"],
      default: "idle"
    },
    context: {
      type: String,
      default: ""
    },
    last_ai_snapshot: {
      total_applied: { type: Number, default: 0 },
      offers_received: { type: Number, default: 0 },
      total_interviews: { type: Number, default: 0 },
      total_rounds_attended: { type: Number, default: 0 },
      total_rounds_cleared: { type: Number, default: 0 }
    }
  },
  { _id: false }
);

const UserAnalyticsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    total_applied: { type: Number, default: 0 },
    total_interviews: { type: Number, default: 0 },
    offers_received: { type: Number, default: 0 },
    total_rounds_attended: { type: Number, default: 0 },
    total_rounds_cleared: { type: Number, default: 0 },

    ai_context: {
      type: aiInfo,
      default: () => ({
        status: "idle",
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
  },
  { timestamps: true }
);

module.exports = UserAnalyticsSchema;
