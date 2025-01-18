import { Truck } from "lucide-react";
import { DashboardData } from "./api";
import { cookies } from "next/headers";

import { VehicleList } from "@/components/dashboard/vehicle-list";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DashboardMetrics } from "@/components/dashboard/metrics";
import { EmissionsCharts } from "@/components/dashboard/emissions-chart";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useTheme } from "next-themes";

export const dynamic = "force-dynamic";
export default async function Component({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = cookies().get("userId")!.value;
  const year = searchParams?.year ? +searchParams.year : 2024;
  // const data = await DashboardData(year, user);
  // const theme = useTheme();
  return (
    <main className="w-full">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Truck className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" ><LineShadowText className="italic w-full" shadowColor={"black"}>Emissions Dashboard</LineShadowText></h1>
              <p className="text-muted-foreground">
                Monitor and optimize your fleet emissions
              </p>
            </div>
          </div>
          {/* <DatePickerWithRange /> */}
        </div>
        <DashboardMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <EmissionsCharts data={data.monthlyAggregates} /> */}
          <div className="space-y-6">
            <VehicleList />
            {/* <AlertsList /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
