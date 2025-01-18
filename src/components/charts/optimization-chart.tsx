import { OptimizationScore } from "@/lib/types/dashboard";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { vehicle: "Truck A", score: 85 },
  { vehicle: "Truck B", score: 75 },
  { vehicle: "Truck C", score: 90 },
  { vehicle: "Truck D", score: 65 },
  { vehicle: "Truck E", score: 80 },
];

export function OptimizationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vehicle" />
        <YAxis domain={[0, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, "Optimization Score"]} />
        <Bar dataKey="score" fill="#c7ddd5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
