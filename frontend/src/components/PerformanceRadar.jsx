import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceRadar({ data }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#2a2a2a" />
          <PolarAngleAxis
            dataKey="round"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "#94a3b8" }} />

          {/* Strength */}
          <Radar
            name="Strength"
            dataKey="strength"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.45}
          />

          {/* Weakness */}
          <Radar
            name="Weakness"
            dataKey="weakness"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
