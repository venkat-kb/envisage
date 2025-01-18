import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import { ShipmentsChart } from "./components/shipments-chart";
import { ActiveUsers } from "./components/active-users";
import { Package, Plus, Route, Truck } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  // get count of shipments this month where createdAt is greater than or equal to the first day of the month
  // get count of TCE this month where createdAt is greater than or equal to the first day of the month
  // get count of bulk uploads this month where createdAt is greater than or equal to the first day of the month
  const newShipmentCount = await prisma.shipment.count({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  const newBulkCount = await prisma.bulkShipment.count({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  const newTCECount = await prisma.tSE.count({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  const users = await prisma.user.count();
  const topUsers = (
    await prisma.user.findMany({
      orderBy: {
        Shipment: {
          _count: "desc",
        },
      },
      take: 7,
      select: {
        _count: {
          select: {
            Shipment: true,
          },
        },
        email: true,
        Profile: true,
      },
    })
  ).map((item) => ({
    name: item.Profile?.name,
    count: item._count.Shipment,
    company: item.Profile?.companyName,
  }));

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Shipments This Month
              </CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{newShipmentCount}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                TCE This Month
              </CardTitle>
              <Route className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{newTCECount}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bulk Uploads This Month
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{newBulkCount}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{users}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ShipmentsChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Most Active Users</CardTitle>
              <CardDescription>
                352 Shipments from most active users this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveUsers data={topUsers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
