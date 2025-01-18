"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Apr",
  },
  {
    name: "May",
  },
  {
    name: "Jun",
  },
  {
    name: "Jul",
  },
  {
    name: "Aug",
  },
  {
    name: "Sep",
  },
  {
    name: "Oct",
  },
  {
    name: "Nov",
  },
  {
    name: "Dec",
  },
  {
    name: "Jan",
  },
  {
    name: "Feb",
  },
  {
    name: "Mar",
  },
];

export default function OverviewChart({
  aggregates,
}: {
  aggregates: number[];
}) {
  const agData = aggregates.map((total, index) => ({
    name: data[index].name,
    total,
  }));
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      maxHeight={500}
      minHeight={350}
    >
      <BarChart data={agData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={80}
          tickFormatter={(value) =>
            `${value < 0 ? value.toFixed(1) : value} MT`
          }
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
