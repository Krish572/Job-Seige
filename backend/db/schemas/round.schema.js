const mongoose = require("mongoose");
const UserAnalytics = require("../models/userAnalytics.model.js");
const Job = require("../models/job.model.js");

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
}, {
    timestamps: true
})

RoundSchema.pre("findOneAndUpdate", async function(){
    this._oldRound = await this.model.findOne(this.getQuery());
})

RoundSchema.post("save", async function(round, next){
    try{
        const job = await Job.findById(round.job_id);
        if(!job) return next();
        let inc = {total_rounds_attended : 1};
        if(round.status === "cleared"){
            inc.total_rounds_cleared = 1;
        }
        if(round.is_interview){
            inc.total_interviews = 1;
        }
        await UserAnalytics.findOneAndUpdate(
            {user_id : job.user_id},
            {$inc : inc}
        )
        next();
    }catch(err){
        next(err);
    }
});

RoundSchema.post("findOneAndUpdate", async function (round, next){
    try{
        const job = await Job.findById(round.job_id);
        if(!job) return next();
        let inc = {};
        if(this._oldRound.status !== "cleared" && round.status === "cleared"){
            inc.total_rounds_cleared = 1;
        }
        if(this._oldRound.status === "cleared" && round.status !== "cleared"){
            inc.total_rounds_cleared = -1;
        }
        if(this._oldRound.is_interview && !round.is_interview){
            inc.total_interviews = -1;
        }
        if(!this._oldRound.is_interview && round.is_interview){
            inc.total_interviews = 1;
        }
        if(Object.keys(inc).length > 0){
            await UserAnalytics.findOneAndUpdate(
                {user_id : job.user_id},
                {$inc: inc}
            );
        }
        next();
    }catch(err){
        next(err);
    }
})

RoundSchema.post("findOneAndDelete", async function (round, next){
    try{
        const job = await Job.findById(round.job_id);
        if(!job) return next();
        let inc = {total_rounds_attended : -1};
        if(round.is_interview){
            inc.total_interviews = -1;
        }
        if(round.status === "cleared"){
            inc.total_rounds_cleared = -1;
        }
        await UserAnalytics.findOneAndUpdate(
            {user_id: job.user_id},
            {$inc : inc}
        );
        next();
    }catch(err){
        next(err);
    }
})



module.exports = RoundSchema;