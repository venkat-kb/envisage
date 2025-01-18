"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Shipment, TSE } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

export const columns: ColumnDef<TSE>[] = [
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
    accessorKey: "co2e",
    id: "Emission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emission" />
    ),
    cell: ({ row }) => {
      const shipments = row.original.shipment as unknown as Shipment[];
      const co2e = shipments.reduce((acc, s) => acc + s.co2e, 0);
      return (
        <div className="flex items-center">
          <KgOrTonneCo2e val={co2e} />
        </div>
      );
    },
  },
];
