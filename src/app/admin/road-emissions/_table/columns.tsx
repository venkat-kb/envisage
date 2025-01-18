"use client";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { RoadVehicle } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RoadVehicle>[] = [
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[400px] line-clamp-1">{row.original.type}</span>
    ),
  },
  {
    accessorKey: "fuel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fuel" />
    ),
    cell: ({ row }) => <span>{row.original.fuel}</span>,
  },
  {
    accessorKey: "wtt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WTT KG" />
    ),
    cell: ({ row }) => <span>{row.original.wtt}</span>,
  },
  {
    accessorKey: "ttw",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WTT KG" />
    ),
    cell: ({ row }) => <span>{row.original.ttw}</span>,
  },
];
