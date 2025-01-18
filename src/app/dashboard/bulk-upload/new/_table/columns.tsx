"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { Icons } from "@/components/ui/icons";
import { Check, CircleAlert, FileWarning } from "lucide-react";
import { BulkValidateShipmentData } from "../page";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

export const columns: ColumnDef<BulkValidateShipmentData>[] = [
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
    accessorKey: "origin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Origin" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px]  lg:max-w-[200px] line-clamp-1 text-ellipsis  font-normal">
            {row.getValue("origin")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "destination",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] lg:max-w-[200px] line-clamp-1 text-ellipsis font-normal">
            {row.getValue("destination")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance KM" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[100px] lg:max-w-[200px] line-clamp-1 text-ellipsis font-normal">
          {row.original.distance.toFixed(0) ?? 0}
        </span>
      );
    },
  },

  {
    accessorKey: "co2e",
    id: "Emission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emission" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <KgOrTonneCo2e val={row.original.co2e ?? 0} />
        </div>
      );
    },
  },
  {
    enableSorting: false,
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {row.original.status === 0 ? (
            <Icons.spinner className="animate-spin h-5 w-5 text-blue-500 " />
          ) : row.original.status === 1 ? (
            <Check className="h-5 w-5 text-green-500 " />
          ) : (
            <CircleAlert className="h-5 w-5 text-yellow-500" />
          )}
        </div>
      );
    },
  },
];
