import { FreightCategoryIcons } from "@/data/freight-categories";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { FreightCategories, FreightMethods } from "@/types/freight-types";
import { Plus, SquareGanttChart } from "lucide-react";
import Link from "next/link";
import { ViewShipmentTable } from "../../shipment/components/shipment-table/view-shipment-table";
import { columns } from "../../shipment/components/shipment-table/columns";
import BulkExportButton from "./export-button";

export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: { id: string } }) {
  const bulk = await prisma.bulkShipment.findFirst({
    where: {
      id: params.id,
    },
  });
  if (!bulk) {
    return <>NOT FOUND</>;
  }
  const bulkData = await prisma.shipment.findMany({
    where: {
      bulkRef: bulk.id,
    },
  });
  if (bulkData.length === 0) return <>No data found</>;
  const category = bulkData[0].category as FreightCategories;
  const method = bulkData[0].method as FreightMethods;
  const ICON = FreightCategoryIcons[category];

  return (
    <>
      <Card className="grow shadow-lg" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Your Bulk Emissions</CardTitle>
          {/* <CardDescription className="max-w-md">
          Introducing Our Dynamic Emission Management Dashboard for Seamless
          Shipment Management and Insightful Analysis.
        </CardDescription> */}
          <div className="grid grid-cols-[auto_1fr] gap-x-2">
            <span className="text-muted-foreground text-sm">Freght Method</span>
            <span className="text-sm flex gap-2 items-center">
              {bulkData[0].category} | {bulkData[0].method}{" "}
              <ICON className="h-4 w-4" />{" "}
            </span>
            <span className="text-muted-foreground text-sm">Reference ID</span>
            <span className="text-sm">{bulk.referenceID}</span>
            <span className="text-muted-foreground text-sm">Upload Date</span>
            <span className="text-sm">{bulk.createdAt.toDateString()}</span>
          </div>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button>
            <Link
              href="/dashboard/bulk-upload/new"
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> New Bulk Upload
            </Link>
          </Button>
          <BulkExportButton
            data={bulkData}
            name={bulk.referenceID}
            method={method}
          />
          <Button variant="outline">
            <Link
              href={`/dashboard/bulk-upload/${params.id}/pdf`}
              className="flex gap-1 items-center"
            >
              <SquareGanttChart className="h-4 w-4 mr-2" />
              Generate PDF
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <ViewShipmentTable data={bulkData} columns={columns} />
    </>
  );
}
