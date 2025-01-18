"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Shipment, Trip } from "@prisma/client";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { FreightCategories } from "@/types/freight-types";
import { FreightCategoryIcons } from "@/data/freight-categories";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

export const columns: ColumnDef<Shipment>[] = [
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
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From" />
    ),
    cell: ({ row }) => (
      <div className="text-xs max-w-[150px]">
        {row.original.from.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="to" />
    ),
    cell: ({ row }) => (
      <div className="text-xs max-w-[150px]">
        {row.original.to.toLocaleDateString("en-IN", {
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
    accessorKey: "category",
    id: "Freight Type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Freight Type" />
    ),
    cell: ({ row }) => {
      const Icon =
        FreightCategoryIcons[row.original.category as FreightCategories];
      return (
        <div className="flex gap-1 font-semibold items-center">
          <Icon className="h-4 w-4" /> {row.original.category}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
      return (
        <div className="flex items-center">
          <KgOrTonneCo2e val={row.original.co2e as number} />
        </div>
      );
    },
  },
];
