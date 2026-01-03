const UserAnalytics = require("../db/models/userAnalytics.model");
const { generateAiContext } = require("./ai.service.js");

async function generateAnalyticsContext({
  analytics,
  strengths = [],
  weaknesses = [],
}) {
  const userId = analytics.user_id;

  try {
    // ✅ Guard 1: Do not regenerate if data is not stale
    if (!analytics.ai_context?.is_stale) {
      return;
    }

    // ✅ Guard 2: Avoid parallel AI calls
    if (analytics.ai_context.status === "processing") {
      return;
    }

    // ✅ Mark AI as processing
    await UserAnalytics.updateOne(
      { user_id: userId },
      {
        $set: {
          "ai_context.status": "processing",
        },
      }
    );

    // ------------------ BUILD PROMPT (SIGNAL-BASED) ------------------

    const strengthsText =
      strengths.length > 0
        ? strengths
            .map(
              (s) =>
                `- ${s.round_type}: ${s.pass_rate}% success (${s.confidence} confidence)`
            )
            .join("\n")
        : "No strong patterns detected yet.";

    const weaknessesText =
      weaknesses.length > 0
        ? weaknesses
            .map(
              (w) =>
                `- ${w.round_type}: ${w.fail_count} failures (${w.confidence} confidence)`
            )
            .join("\n")
        : "No major weaknesses detected yet.";

    const prompt = `
You are a career analytics AI and job search coach.

Analyze the user's interview performance patterns and provide actionable insights.

Strengths:
${strengthsText}

Weaknesses:
${weaknessesText}

Your task:
1. Summarize the user's interview performance clearly.
2. Explain strengths and weaknesses based on patterns.
3. Suggest 3-5 focused improvements.
4. Give a short motivational insight.

Rules:
- Be concise and specific.
- Avoid generic advice.
- Base conclusions only on provided patterns.
- Output plain text only.
`;

    // ------------------ CALL AI (EXPENSIVE STEP) ------------------

    console.log(`[AI] Generating insights for user ${userId}`);

    const aiContext = await generateAiContext(prompt);

    // ------------------ SAVE RESULT & CLEAR STALE FLAG ------------------

    await UserAnalytics.updateOne(
      { user_id: userId },
      {
        $set: {
          "ai_context.context": aiContext,
          "ai_context.status": "ready",
          "ai_context.is_stale": false,
          "ai_context.last_ai_snapshot": {
            pattern_hash:
              analytics.ai_context.last_ai_snapshot?.pattern_hash || "",
            generated_at: new Date(),
          },
        },
      }
    );
  } catch (err) {
    console.error("AI generation failed:", err.message);

    await UserAnalytics.updateOne(
      { user_id: userId },
      {
        $set: {
          "ai_context.status": "failed",
        },
      }
    );
  }
}

module.exports = { generateAnalyticsContext };
