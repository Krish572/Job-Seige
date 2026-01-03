const Round = require("../db/models/round.model");
const Job = require("../db/models/job.model");

async function computePerformanceInsights(userId) {
  const rounds = await Round.aggregate([
    // Join with Job to get user_id
    {
      $lookup: {
        from: "jobs",
        localField: "job_id",
        foreignField: "_id",
        as: "job",
      },
    },
    { $unwind: "$job" },

    // Filter by user and completed rounds
    {
      $match: {
        "job.user_id": userId,
        status: { $in: ["cleared", "rejected"] },
      },
    },

    // Group by round_type
    {
      $group: {
        _id: "$round_type",
        attempts: { $sum: 1 },
        pass_count: {
          $sum: { $cond: [{ $eq: ["$status", "cleared"] }, 1, 0] },
        },
        fail_count: {
          $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] },
        },
      },
    },
  ]);

  const strengths = [];
  const weaknesses = [];

  for (const r of rounds) {
    const passRate = Math.round((r.pass_count / r.attempts) * 100);

    const confidence =
      r.attempts >= 5 ? "high" : r.attempts >= 3 ? "medium" : "low";

    const insight = {
      round_type: r._id,
      attempts: r.attempts,
      pass_count: r.pass_count,
      fail_count: r.fail_count,
      pass_rate: passRate,
      confidence,
    };

    if (passRate >= 70 && r.attempts >= 3) {
      strengths.push(insight);
    }

    if (passRate <= 40 && r.attempts >= 2) {
      weaknesses.push(insight);
    }
  }

  return { strengths, weaknesses };
}

module.exports = computePerformanceInsights;
