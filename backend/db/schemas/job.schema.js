const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    company: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },

    location: {
      type: String,
      maxlength: 150,
      trim: true,
    },

    contact: {
      type: String,
      maxlength: 100,
      trim: true,
    },

    applied_on: {
      type: Date,
    },

    current_status: {
      type: String,
      enum: ["applied", "shortlisted", "interview", "offer", "rejected"],
      default: "applied",
    },

    notes: {
      type: String,
      maxlength: 400,
    },

    isShortlisted: {
      type: Boolean,
      default: false,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    salary_expected: Number,

    interview_date: Date,

    application_link: {
      type: String,
      trim: true,
    },

    description: String,

    job_type: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
    },

    salary_offered: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = JobSchema; // ONLY schema