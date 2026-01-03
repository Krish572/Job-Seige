const UserAnalytics = require("../db/models/userAnalytics.model");

async function markAIStale(userId) {
  await UserAnalytics.updateOne(
    { user_id: userId },
    { $set: { "ai_context.is_stale": true } }
  );
}

module.exports = markAIStale;
