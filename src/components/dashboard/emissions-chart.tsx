"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DistanceChart } from "../charts/distance-chart";
import { OptimizationChart } from "../charts/optimization-chart";
import OverviewChart from "../charts/overview-chart";
import YearSelect from "@/app/dashboard/shipment/components/year-select";

export function EmissionsCharts({ data }: { data: number[] }) {
  return (
    <Card className="col-span-1">
      <CardHeader className="bg-black flex items-center justify-between flex-row">
        <CardTitle className="text-white">Emissions Analytics</CardTitle>
        <YearSelect defaultValue={2024} />
      </CardHeader>
      <CardContent className="mt-4">
        <OverviewChart aggregates={data} />
      </CardContent>
    </Card>
  );
}
