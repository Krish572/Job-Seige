const UserAnalytics = require("../db/models/userAnalytics.model.js");
const isMeaningfullChange = require("../utils/isMeaningfullChange.js");
const {generateAnalyticsContext} = require("../services/generateAnalyticsContext.js");


async function getUserAnalytics(req, res){
    try{
        const analytics = await UserAnalytics.findOne({user_id: process.env.DEV_USER_ID})
        let success_ratio = 0;
        if(analytics.total_applied !== 0){
            success_ratio = Number(((analytics.offers_received/analytics.total_applied) * 100).toFixed(2));
        }
        if(analytics.total_applied !== 0 && isMeaningfullChange(analytics)){
            console.log("Its valid Change, calling the AI from BG");
            generateAnalyticsContext(analytics);
        }else{
            console.log("Its not a valid Change, Skipping the AI call");
        }
        return res.status(200).json({
            total_applied: analytics.total_applied,
            offers_received: analytics.offers_received,
            total_interviews: analytics.total_interviews,
            total_rounds_attended: analytics.total_rounds_attended,
            total_rounds_cleared: analytics.total_rounds_cleared,
            success_ratio,
        });
    }catch(err){
        return res.status(500).json({message: "Error while reading the user Analytics " + err});
    }
}

async function getAIAnalysis(req, res){
    try{
        const analytics = await UserAnalytics.findOne(
            {user_id: process.env.DEV_USER_ID},
            {ai_context: 1}
        );
        if(!analytics || !analytics.ai_context){
            return res.status(404).json({
                message: "User/Analytics not found",
                status: "idle",
                ai_context : null
            });
        }
        const {status, context} = analytics.ai_context;
        if(status === "processing"){
            return res.status(500).json({
                message: "Processing AI Info",
                status: "Processing",
                ai_context: null
            });
        }
        if (status === "failed") {
            return res.status(200).json({
                status: "failed",
                ai_context: null,
                message: "AI analysis failed."
            });
        }
        return res.status(200).json({status: "ready", ai_context: context});
    }catch(err){
        return res.status(500).json({message: "Error while generating AI Analysis " + err});
    }
}

module.exports = {
    getUserAnalytics,
    getAIAnalysis
}