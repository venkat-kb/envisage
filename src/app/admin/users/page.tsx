import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, SquareGanttChart } from "lucide-react";
import { cookies } from "next/headers";
import { ViewUsersTable } from "./_table/view-users-table";
import { columns } from "./_table/columns";
import { Profile, User } from "@prisma/client";

export const dynamic = "auto";
export default async function Page() {
  const users = (
    await prisma.user.findMany({
      include: {
        Profile: true,
      },
    })
  ).reverse() as (User & { Profile: Profile })[];
  return (
    <>
      <Card className="grow shadow-lg" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>TEMT Users</CardTitle>
          <CardDescription className="max-w-md  leading-relaxed">
            Create, edit & manage active users on the TEMT portal.
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

      {/* <ViewShipmentTable data={data} columns={columns} /> */}
      <ViewUsersTable data={users} columns={columns} />
    </>
  );
}
