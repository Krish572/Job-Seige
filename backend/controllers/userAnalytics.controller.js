const UserAnalytics = require("../db/models/userAnalytics.model.js");
const computePerformanceInsights = require("../services/computePerformanceInsights.js");
const {
  generateAnalyticsContext,
} = require("../services/generateAnalyticsContext.js");

/**
 * GET /analytics
 * Pure READ API
 * - Returns dashboard numbers
 * - NO AI side effects
 */
async function getUserAnalytics(req, res) {
  try {
    const analytics = await UserAnalytics.findOne({
      user_id: process.env.DEV_USER_ID,
    });
    console.log(process.env.DEV_USER_ID);
    console.log(analytics);

    if (!analytics) {
      return res.status(404).json({
        message: "User analytics not found",
      });
    }

    const success_ratio =
      analytics.total_applied > 0
        ? Number(
            (
              (analytics.offers_received / analytics.total_applied) *
              100
            ).toFixed(2)
          )
        : 0;

    return res.status(200).json({
      total_applied: analytics.total_applied,
      offers_received: analytics.offers_received,
      total_interviews: analytics.total_interviews,
      total_rounds_attended: analytics.total_rounds_attended,
      total_rounds_cleared: analytics.total_rounds_cleared,
      success_ratio,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while reading user analytics",
      error: err.message,
    });
  }
}

/**
 * GET /analytics/ai
 * - Fetches AI analysis if available
 * - Frontend uses is_stale to show "Regenerate" button
 */
async function getAIAnalysis(req, res) {
  try {
    const analytics = await UserAnalytics.findOne(
      { user_id: process.env.DEV_USER_ID },
      { ai_context: 1 }
    );

    if (!analytics || !analytics.ai_context) {
      return res.status(404).json({
        status: "idle",
        ai_context: null,
        is_stale: false,
      });
    }

    const { status, context, is_stale } = analytics.ai_context;

    if (status === "processing") {
      return res.status(200).json({
        status: "processing",
        ai_context: null,
        is_stale,
      });
    }

    if (status === "failed") {
      return res.status(200).json({
        status: "failed",
        ai_context: null,
        is_stale,
        message: "AI analysis failed",
      });
    }

    return res.status(200).json({
      status: "ready",
      ai_context: context,
      is_stale,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching AI analysis",
      error: err.message,
    });
  }
}

/**
 * POST /analytics/ai/generate
 * - USER-INITIATED AI call
 * - Runs ONLY if data is stale
 * - This is the ONLY place AI is triggered
 */
async function generateAIAnalysis(req, res) {
  try {
    const analytics = await UserAnalytics.findOne({
      user_id: process.env.DEV_USER_ID,
    });

    if (!analytics) {
      return res.status(404).json({
        message: "User analytics not found",
      });
    }

    // Prevent unnecessary AI calls
    if (!analytics.ai_context.is_stale) {
      return res.status(200).json({
        message: "AI analysis is already up to date",
        status: "ready",
      });
    }

    if (analytics.ai_context.status === "processing") {
      return res.status(200).json({
        message: "AI analysis is already in progress",
        status: "processing",
      });
    }

    // Calling to get the updated strengths and weekness
    const { strengths, weaknesses } = await computePerformanceInsights(
      analytics.user_id
    );

    // Trigger AI (async, background)
    generateAnalyticsContext({ analytics });

    return res.status(202).json({
      message: "AI analysis started",
      status: "processing",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to trigger AI analysis",
      error: err.message,
    });
  }
}

module.exports = {
  getUserAnalytics,
  getAIAnalysis,
  generateAIAnalysis,
};
