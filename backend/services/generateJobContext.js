const Job = require("../db/models/job.model.js");
const {generateAiContext} = require("./ai.service.js");

async function generateJobContextInBG(job){
    try{
        const prompt = `
            You are a career coach AI.

            Based on the following job details, create a clear preparation roadmap,
            skills to focus on, interview strategy, and common mistakes to avoid.

            Job Details:
            ${JSON.stringify(job, null, 2)}

            Return ONLY a well-structured plain text roadmap.
            `;
        const aiContext = await generateAiContext(prompt);
        await Job.findByIdAndUpdate(job._id, {ai_context : aiContext});
    }catch(err){
        console.error("AI generation failed " +  err);
    }   
}

module.exports = generateJobContextInBG;