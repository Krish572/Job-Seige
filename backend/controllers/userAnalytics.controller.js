const UserAnalytics = require("../db/models/userAnalytics.model.js");
const isMeaningfullChange = require("../utils/isMeaningfullChange.js");


async function getUserAnalytics(req, res){
    try{
        const analytics = await UserAnalytics.findOne({});
        let success_ratio = 0;
        if(analytics.total_applied !== 0){
            success_ratio = Number(((analytics.offers_received/analytics.total_applied) * 100).toFixed(2));
        }
        
        return res.status(200).json({
            ...analytics.toObject(),
            success_ratio
        });
    }catch(err){
        return res.status(500).json({message: "Error while reading the user Analytics " + err});
    }
}

module.exports = {
    getUserAnalytics
}