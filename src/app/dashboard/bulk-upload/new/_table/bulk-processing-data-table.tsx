"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";

import { DataTableToolbar } from "./bulk-processing-table-toolbar";
import { DataTableRowActions } from "./bulk-processing-row-actions";
import { Sheet } from "@/components/ui/sheet";
import { ShipmentData } from "@/types/freight-data";
import BulkShipmentSheet from "./bulk-shipment-sheet";
import BaseDataTable from "@/components/table/base-data-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends ShipmentData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [open, setOpen] = React.useState(false);
  const [ID, setID] = React.useState(-1);
  const table = useReactTable({
    data,
    columns: [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => (
          <DataTableRowActions row={row} setOpen={setOpen} setID={setID} />
        ),
      },
    ],
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {ID !== -1 && <BulkShipmentSheet data={data[ID]} />}
      </Sheet>
      <div className="space-y-4 max-h-[80vh]">
        <DataTableToolbar table={table} />
        <BaseDataTable table={table} columns={columns} />
      </div>
    </>
  );
}
