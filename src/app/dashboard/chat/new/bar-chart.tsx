"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Road", desktop: 80, mobile: 66 },
  { month: "Air", desktop: 10, mobile: 3 },
  { month: "Water", desktop: 6, mobile: 15 },
  { month: "Rail", desktop: 4, mobile: 15 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function AIChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Freight Emission Breakdown</CardTitle>
        <CardDescription>FY24 | 30,000 EWayBills</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="horizontal">
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-start gap-2 text-sm">
        <div className="h-4 w-4 bg-[hsl(var(--chart-1))]"></div>Net Emission
        <div className="h-4 w-4 bg-[hsl(var(--chart-2))]"></div>Net Load
      </CardFooter>
    </Card>
  );
}
