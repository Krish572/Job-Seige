import axios from "axios";
import { useState, useEffect } from "react";
import PerformanceRadar from "./PerformanceRadar";

export function Dashboard() {
  const [radarData, setRadarData] = useState([]);

  const [analytics, setAnalytics] = useState({
    total_applied: 0,
    total_interviews: 0,
    offers_received: 0,
    total_rounds_attended: 0,
    total_rounds_cleared: 0,
  });

  const fetchJobAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/analytics"
        // { params: { user_id: "eddie.dev@gmail.com" } }
      );
      console.log(response.data);
      const strengths = response.data.strengths || [];
      const weaknesses = response.data.weaknesses || [];

      const formatted = [
        ...strengths.map((s) => ({
          round: s.round_type,
          strength: s.pass_rate,
          weakness: 0,
        })),
        ...weaknesses.map((w) => ({
          round: w.round_type,
          strength: 0,
          weakness: 100 - w.pass_rate,
        })),
      ];

      setRadarData(formatted);

      setAnalytics({
        total_applied: response.data.total_applied,
        total_interviews: response.data.total_interviews,
        offers_received: response.data.offers_received,
        total_rounds_attended: response.data.total_rounds_attended,
        total_rounds_cleared: response.data.total_rounds_cleared,
      });
    } catch (err) {
      console.error("Error Fetching Job Analytics" + err);
    }
  };

  useEffect(() => {
    fetchJobAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <StatCard title="Jobs Applied" value={analytics.total_applied} />
            <StatCard title="Interviews" value={analytics.total_interviews} />
            <StatCard
              title="Offers Received"
              value={analytics.offers_received}
            />
            <StatCard
              title="Rounds Attended"
              value={analytics.total_rounds_attended}
            />
            <StatCard
              title="Rounds Cleared"
              value={analytics.total_rounds_cleared}
            />
          </div>

          {/* AI ANALYSIS */}
          <div className="bg-white dark:bg-[#111] rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-3">
              AI Analysis & Suggestions
            </h2>

            <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Focus more on System Design interview questions</li>
              <li>Improve DSA medium-level consistency</li>
              <li>Work on HR & behavioral rounds</li>
              <li>Mock interviews recommended this week</li>
            </ul>

            <button className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Get Detailed AI Guidance
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white dark:bg-[#111] rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Strength vs Weakness</h2>
          {/* GRAPH PLACEHOLDER
          <div className="h-64 flex items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Graph will appear here 📊
            </p>
          </div> */}
          {radarData.length > 0 ? (
            <PerformanceRadar data={radarData} />
          ) : (
            <p className="text-gray-400">No performance data yet</p>
          )}

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Based on interview rounds performance
          </div>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE STAT CARD */
function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#111] rounded-xl p-5 shadow hover:shadow-lg transition">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
