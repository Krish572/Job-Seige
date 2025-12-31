const UserAnalytics = require("../db/models/userAnalytics.model");
const {generateAiContext} = require("./ai.service.js");

async function generateAnalyticsContext(analytics){
    try{
        const userId = analytics.user_id;
        if(analytics.aiContext?.status === "processing"){
            return;
        }
        await UserAnalytics.findOneAndUpdate(
            { user_id: userId },
            {
                $set: {
                ai_context: {
                    context: analytics.ai_context?.context || "",
                    status: "processing",
                    last_ai_snapshot:
                    analytics.ai_context?.last_ai_snapshot || {
                        total_applied: 0,
                        offers_received: 0,
                        total_interviews: 0,
                        total_rounds_attended: 0,
                        total_rounds_cleared: 0
                    }
                }
                }
            },
            { upsert: true }
        );
        const successRatio =
        analytics.total_applied > 0
            ? Number(
                ((analytics.offers_received / analytics.total_applied) * 100).toFixed(2)
            )
            : 0;
        const prompt = `
            You are a career analytics AI and job search coach.

            Analyze the following user analytics data and generate clear, actionable insights.

            User Analytics:
            - Total jobs applied: ${analytics.total_applied}
            - Offers received: ${analytics.offers_received}
            - Success ratio (%): ${successRatio}
            - Total interviews attended: ${analytics.total_interviews}
            - Total interview rounds attended: ${analytics.total_rounds_attended}
            - Total rounds cleared: ${analytics.total_rounds_cleared}

            Your task:
            1. Summarize the users overall job search performance.
            2. Identify strengths and weaknesses in their application and interview process.
            3. Explain what the success ratio indicates in simple terms.
            4. Suggest 3-5 concrete, actionable improvements the user can apply immediately.
            5. Provide a short motivational insight based on the data.

            Rules:
            - Be concise and structured.
            - Avoid generic advice.
            - Use a supportive, professional tone.
            - Do NOT repeat the raw numbers unless necessary.
            - Output plain text only.
        `
        const aiContext = await generateAiContext(prompt);
        await UserAnalytics.findOneAndUpdate(
            {user_id: userId},
            {
                $set: {
                    "ai_context.context": aiContext,
                    "ai_context.status": "ready",
                    "ai_context.last_ai_snapshot": {
                        total_applied: analytics.total_applied,
                        offers_received: analytics.offers_received,
                        total_interviews: analytics.total_interviews,
                        total_rounds_attended: analytics.total_rounds_attended,
                        total_rounds_cleared: analytics.total_rounds_cleared
                    }
                }
            }
        )
    }catch(err){
        console.log("AI generation failed " + err);
        await UserAnalytics.updateOne(
                { user_id: analytics.user_id },
                { $set: { "ai_context.status": "failed" } }
            );
    }
}

module.exports = {generateAnalyticsContext};