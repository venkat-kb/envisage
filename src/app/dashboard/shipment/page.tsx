import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ViewShipmentTable } from "./components/shipment-table/view-shipment-table";
import { columns } from "./components/shipment-table/columns";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import PDFLink from "./components/pdf-link";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default async function Page() {
  const cookieStore = cookies().get("userId");
  const data = (
    await prisma.shipment.findMany({
      where: {
        userId: cookieStore?.value!,
      },
    })
  ).reverse();
  return (
    <>
      <Card className="grow shadow-lg" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Your Shipments Emissions</CardTitle>
          <CardDescription className="max-w-md  leading-relaxed">
            Introducing Our Dynamic Emission Management Dashboard for Seamless
            Shipment Management and Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
            <Link href="/dashboard/shipment/new" >
          <InteractiveHoverButton>
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Shipment
            </div>
          </InteractiveHoverButton>
            </Link>
          <PDFLink />
          {/* <Button variant="outline">
            <Link
              href="/dashboard/shipment/pdf"
              prefetch={false}
              className="flex items-center"
            >
              <SquareGanttChart className="h-4 w-4 mr-2" /> Consolidated PDF
              Report
            </Link>
          </Button> */}
          {/* <ShipmentPrintButton data={data} columns={columns} /> */}
        </CardFooter>
      </Card>
      <div className="flex items-center justify-between space-y-2">
        <p className="text-muted-foreground">List of your previous shipments</p>
      </div>
      <ViewShipmentTable data={data} columns={columns} />
    </>
  );
}

export const dynamic = "force-dynamic";
