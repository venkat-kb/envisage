import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { BulkDataTable } from "./_table/bulk-data-table";
import { columns } from "./_table/columns";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export default async function Page() {
  const userId = cookies().get("userId")?.value;
  const bulk = (
    await prisma.bulkShipment.findMany({
      where: {
        userId,
      },
    })
  ).reverse();
  return (
    <>
      <Card className="grow shadow-lg" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Bulk Upload</CardTitle>
          <CardDescription className="max-w-md leading-relaxed">
            Use the bulk uploader to upload data directly from an excel file.
            View your previous uploads and manage them here.
          </CardDescription>
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
        </CardFooter>
      </Card>
      <BulkDataTable columns={columns} data={bulk} />
    </>
  );
}
