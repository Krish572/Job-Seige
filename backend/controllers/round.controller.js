const Round = require("../db/models/round.model.js");
const Job = require("../db/models/job.model.js");

async function isJobExists(id){
    const job = await Job.findById(id);
    return job;   
}

async function isRoundExists(id){
    const round = await Round.findById(id);
    return round;
}

async function createRound(req, res){
    try{
        const {jobId} = req.params;

        console.log(jobId);

        const job = await isJobExists(jobId);
        if(!job){
            return res.status(404).json({message: "Job not found"});
        }
        
        await Round.create({
            ...req.body,
            job_id: jobId
        });
        return res.status(201).json({message: "Round created Succesfully"});
    }catch(err){
        return res.status(500).json({message: "Error while creating Round " + err});
    }
}


async function getRounds(req, res){
    try{
        const {jobId} = req.params;
        const job = await isJobExists(jobId);
        if(!job){
            return res.status(404).json({message: "Job not found"});
        }
        let filter = {job_id : jobId};
        if(req.query.status){
            filter.status = req.query.status;
        }
        if(req.query.name){
            filter.name = {
                $regex : req.query.name.split(" ").join(".*"),
                $options: "i"
            };
        }
        const rounds = await Round.find(filter).sort({scheduled_at: 1});
        return res.status(200).json({rounds});
    }catch(err){
        return res.status(500).json({message: "Error while reading the rounds " + err});
    }
}

async function getRound(req, res) {
    try{
        const {jobId, roundId} = req.params;
        const job = await isJobExists(jobId);
        if(!job){
            return res.status(404).json({message: "Job not found"});
        }
        const round = await isRoundExists(roundId);
        if(!round || round.job_id.toString() !== jobId){
            return res.status(404).json({message: "Round not found"});
        }
        return res.status(200).json({round});
    }catch(err){
        return res.status(500).json({message: "Error while reading the round " + err});
    }
}

async function updateRound(req, res){
    try{
        const {jobId, roundId} = req.params;
        const job = await isJobExists(jobId);
        if(!job){
            return res.status(404).json({message: "Job not found"});
        }
        const round = await isRoundExists(roundId);
        if(!round || round.job_id !== jobId){
            return res.status(404).json({message: "Round not found"});
        }
        await Round.findByIdAndUpdate(roundId, {
            ...req.body
        }, {new : true});
        return res.status(200).json({message: "Round updated succesfully"});
    }catch(err){
        return res.status(500).json({message: "Error while updating the Round " + err});
    }
}

async function deleteRound(req, res) {
    try{
        const {jobId, roundId} = req.params;
        const job = await isJobExists(jobId);
        if(!job) {
            return res.status(404).json({message: "Job not found"});
        }
        const round = await isRoundExists(roundId);
        if(!round || round.job_id !== jobId){
            return res.status(404).json({message: "Round not found"});
        } 
        await Round.findByIdAndDelete(roundId);
        return res.status(200).json({message: "Round deleted succesfully"});
    }catch(err){
        return res.status(500).json({message: "Error while deleting the round " + err});
    }
}



module.exports = {
    createRound,
    getRounds,
    getRound,
    updateRound,
    deleteRound,
};