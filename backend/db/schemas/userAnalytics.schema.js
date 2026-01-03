const mongoose = require("mongoose");
const aiInfoSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["idle", "processing", "ready", "failed"],
      default: "idle",
    },
    context: { type: String, default: "" },
    last_ai_snapshot: {
      pattern_hash: { type: String, default: "" },
      generated_at: Date,
    },
    is_stale: { type: Boolean, default: false },
  },
  { _id: false }
);

const performanceSchema = new mongoose.Schema(
  {
    round_type: {
      type: String,
      enum: [
        "DSA",
        "LLD",
        "HLD",
        "MACHINE_CODING",
        "HR",
        "MANAGERIAL",
        "OTHER",
      ],
      required: true,
    },
    attempts: { type: Number, default: 0 },
    pass_count: { type: Number, default: 0 },
    fail_count: { type: Number, default: 0 },
    pass_rate: { type: Number, default: 0 },
    confidence: { type: String, enum: ["low", "medium", "high"] },
  },
  { _id: false }
);

const UserAnalyticsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    total_applied: { type: Number, default: 0 },
    total_interviews: { type: Number, default: 0 },
    offers_received: { type: Number, default: 0 },
    total_rounds_attended: { type: Number, default: 0 },
    total_rounds_cleared: { type: Number, default: 0 },

    // ✅ EMBED SUB-SCHEMAS DIRECTLY
    strengths: {
      type: [performanceSchema],
      default: [],
    },
    weaknesses: {
      type: [performanceSchema],
      default: [],
    },

    ai_context: {
      type: aiInfoSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

module.exports = UserAnalyticsSchema;

//module.exports = mongoose.model("UserAnalytics", UserAnalyticsSchema);
