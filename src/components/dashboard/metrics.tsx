"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Truck,
  Fuel,
  Target,
  AlertTriangle,
  ClipboardPlus,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { NeonGradientCard } from "../ui/neon-gradient-card";
import { ShinyButton } from "../ui/shiny-button";
import { ShimmerButton } from "../ui/shimmer-button";
import { MagicCard } from "../ui/magic-card";
import { useTheme } from "next-themes";
import { AuroraText } from "../ui/aurora-text";
import { CoolMode } from "../ui/cool-mode";

const metrics = [
  {
    title: "Shipments",
    value: "47",
    description: "Total vehicles in operation",
    icon: Truck,
    trend: "+2 from last month",
  },
  {
    title: "Fuel Efficiency",
    value: "8.2 km/L",
    description: "Average across fleet",
    icon: Fuel,
    trend: "-0.3 km/L improvement",
  },
  {
    title: "Emission Target",
    value: "85%",
    description: "Progress towards goal",
    icon: Target,
    trend: "On track",
  },
];

export function DashboardMetrics() {
  const { theme } = useTheme();
  return (
    <div className="flex gap-4">  
      {/* <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Your Shipment & Emissions
          </CardTitle>
          <ClipboardPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex gap-2 flex-col">
          <p className="text-xs text-muted-foreground mt-1">
            Introducing Our Dynamic Emission Management Dashboard for Seamless
            Shipment Management and Insightful Analysis.
          </p>
          <div className="flex gap-4">
            <Button className="flex-1">
              <Link href="/dashboard/shipment/new">Create New Shipment</Link>
            </Button>
            <Button variant="outline" className="flex-1">
              <Link href="/dashboard/shipment">Previous Shipments</Link>
            </Button>
          </div>
        </CardContent>
      </Card> */}
      <NeonGradientCard className="max-w-sm items-center justify-center leading-loose flex-col-3 h-60 z-0">
      <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Your Shipment and Emissions
        
      </span> 
      <div>
        <span className="leading-none pointer-events-none z-10 h-full whitespace-pre-wrap bg-black bg-clip-text text-md leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Introducing our dynamic emission management dashboard for seamless
        shipment management and insightful analysis.  
      </span>
      </div> 
      <div className="flex gap-4 mt-4">
      <CoolMode>
      <a href="/dashboard/shipment/new">
        
        <ShimmerButton className="px-3 py-3 text-sm">
          Create New Shipment
        </ShimmerButton></a>
        </CoolMode>
        <Link href="/dashboard/shipment">
          <ShimmerButton className="px-3 py-3 text-sm">
            Previous Shipments
          </ShimmerButton></Link>
      </div>
     </NeonGradientCard>
      {metrics.map((metric) => (
        <MagicCard key={metric.title} className="cursor-pointer flex-col whitespace-nowrap text-4xl shadow-2xl h-60 flex-col" gradientColor={theme === "dark" ? "#212121" : "#BBBBBB80"}>
          <CardHeader className="flex flex-col justify-between space-y-0 pb-2 gap-4">
            <CardTitle className="text-md font-medium tracking-tighter">
              <div className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-left text-4xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">{metric.title}</div>
            </CardTitle>
            <metric.icon className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent className="items-left">
            <div className="text-3xl font-bold">{metric.value}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {metric.description}
            </p>
            <p
              className={`text-sm mt-2 ${
                metric.trend.includes("+") && "text-[#456a4a]"
              } ${metric.trend.includes("-") && "text-[#e34e47]"}`}
            >
              {metric.trend}
            </p>
          </CardContent>
        </MagicCard>
      ))}
    </div>
  );
}
