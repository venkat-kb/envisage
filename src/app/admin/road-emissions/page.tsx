import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { Plus, Truck } from "lucide-react";
import Link from "next/link";
import ViewRoadEmissionsTable from "./_table/view-road-emissions-table";
import { columns } from "./_table/columns";

export default async function Page() {
  const data = await prisma.roadVehicle.findMany();
  return (
    <>
      <Card className="grow shadow-lg" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Truck className="h-6 w-6 mr-2" /> Road Emissions
          </CardTitle>
          <CardDescription className="max-w-md  leading-relaxed">
            Create, edit & manage intercity & intracity emissions base data.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button>
            <Link href="/admin/users/new" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" /> Create New User
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <ViewRoadEmissionsTable data={data} columns={columns} />
    </>
  );
}
