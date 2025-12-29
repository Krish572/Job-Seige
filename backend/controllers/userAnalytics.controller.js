const UserAnalytics = require("../db/models/userAnalytics.model.js");


async function getUserAnalytics(req, res){
    try{
        const analytics = await UserAnalytics.findOne({});
        return res.status(200).json({analytics});
    }catch(err){
        return res.status(500).json({message: "Error while reading the user Analytics " + err});
    }
}

module.exports = {
    getUserAnalytics
}