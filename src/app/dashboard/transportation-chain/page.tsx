import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, SquareGanttChart } from "lucide-react";
import Link from "next/link";
import { TCEViewDataTable } from "./_table/tce-view-data-table";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { columns } from "./_table/columns";

export default async function Page() {
  const cookieStore = cookies().get("userId");
  const data = await prisma.tSE.findMany({
    where: {
      userId: cookieStore?.value!,
    },
  });
  return (
    <>
      <Card className="grow shadow-lg" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Your Shipments Emissions</CardTitle>
          <CardDescription className="max-w-md  leading-relaxed">
            Create dynamic transport chains to manage and analyse your shipments
            and GHG Emissions
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button>
            <Link
              href="/dashboard/transportation-chain/new"
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> Create New Transport Chain
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/dashboard/shipment/new" className="flex items-center">
              <SquareGanttChart className="h-4 w-4 mr-2" /> Consolidated GHG
              Report
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <TCEViewDataTable data={data} columns={columns} />
    </>
  );
}
