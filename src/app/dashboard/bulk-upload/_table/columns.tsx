"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { Icons } from "@/components/ui/icons";
import { ArrowRight, Check } from "lucide-react";
import { BulkShipment } from "@prisma/client";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

export const columns: ColumnDef<BulkShipment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
    ),
    cell: ({ row }) => (
      <div className="text-xs max-w-[150px]">
        {row.original.createdAt.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "referenceID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] lg:max-w-[300px] line-clamp-1 text-ellipsis font-normal">
            {row.original.referenceID}
          </span>
        </div>
      );
    },
  },
  {
    enableSorting: false,
    id: "View",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          prefetch={false}
          href={"/dashboard/bulk-upload/" + row.original.id}
        >
          <ArrowRight className="h-4 w-4 text-blue-500" />
        </Link>
      );
    },
  },
];
