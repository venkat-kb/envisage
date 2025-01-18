import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { DistanceData } from "@/lib/types/dashboard";

const data = [
  { date: "2024-01-01", distance: 4000 },
  { date: "2024-01-02", distance: 3000 },
  { date: "2024-01-03", distance: 2000 },
  { date: "2024-01-04", distance: 2780 },
  { date: "2024-01-05", distance: 1890 },
  { date: "2024-01-06", distance: 2390 },
  { date: "2024-01-07", distance: 3490 },
];

export function DistanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(str) => format(parseISO(str), "MMM d")}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) =>
            format(parseISO(value as string), "MMM d, yyyy")
          }
          formatter={(value) => [`${value} km`, "Distance"]}
        />
        <Line
          type="monotone"
          dataKey="distance"
          stroke="#13231d"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
