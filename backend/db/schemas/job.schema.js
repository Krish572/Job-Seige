const mongoose = require("mongoose");
const UserAnalytics = require("../models/userAnalytics.model.js");

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
      enum: ["applied", "shortlisted", "offer", "rejected"],
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
    ai_context: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

JobSchema.post("save", async function (job, next){
  try{
    await UserAnalytics.findOneAndUpdate(
      {user_id: job.user_id},
      {$inc : {total_applied : 1}}
    );
    next();
  }catch(err){
    next(err);
  }
})

JobSchema.post("findOneAndUpdate", async function(job, next) {
  try{
    if(job.current_status === "offer"){
      await UserAnalytics.findOneAndUpdate(
        {user_id : job.user_id},
        {$inc : {offers_received : 1}}
      )
    };
    next();
  }catch(err){
    next(err);
  }
})

JobSchema.post("findOneAndDelete", async function(job, next){
  try{
    const change = {total_applied : -1};
    if(job.current_status === 'offer'){
      change.offers_received = -1;
    }
    await UserAnalytics.findOneAndUpdate(
      {user_id: job.user_id},
      {$inc: change}
    );
    next();
  }catch(err){
    next(err);
  }
})




module.exports = JobSchema; // ONLY schema