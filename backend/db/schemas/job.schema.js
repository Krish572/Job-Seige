const mongoose = require("mongoose");
const UserAnalytics = require("../models/userAnalytics.model.js");
const Round = require("../models/round.model.js");

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
  },
  {
    timestamps: true,
  }
);

JobSchema.post("save", async function (job, next){
  try{
    let change = {total_applied : 1};
    if(job.current_status === "offer"){
      change.offers_received = 1;
    }
    await UserAnalytics.findOneAndUpdate(
      {user_id: job.user_id},
      {$inc : change}
    );
    next();
  }catch(err){
    next(err);
  }
})

JobSchema.pre("findOneAndUpdate", async function(){
  this._oldJob = await this.model.findOne(this.getQuery());
})

JobSchema.post("findOneAndUpdate", async function(job, next) {
  try{
    if(!job || !this._oldJob) return next();
    if(this._oldJob.current_status !== "offer" && job.current_status === "offer"){
      await UserAnalytics.findOneAndUpdate(
        {user_id : job.user_id},
        {$inc : {offers_received : 1}}
      )
    }
    if(this._oldJob.current_status === "offer" && job.current_status !== "offer"){
      await UserAnalytics.findOneAndUpdate(
        {user_id : job.user_id},
        {$inc : {offers_received : -1}}
      )
    };
    next();
  }catch(err){
    next(err);
  }
})

JobSchema.post("findOneAndDelete", async function(job, next){
  try{
    const rounds = await Round.find({job_id: job._id});
    const roundChange = {
      total_rounds_attended : -rounds.length,
      total_rounds_cleared : 0,
      total_interviews: 0
    };
    for(let i = 0; i < rounds.length; i++){
      if(rounds[i].status === "cleared"){
        roundChange.total_rounds_cleared -= 1
      }
      if(rounds[i].is_interview){
        roundChange.total_interviews -= 1
      }
    }
    const change = {total_applied : -1, ...roundChange};
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