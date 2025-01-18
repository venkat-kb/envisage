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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTableToolbar } from "./view-shipment-toolbar";
import { ViewShimentRowActions } from "./view-shipment-row-actions";
import { Sheet } from "@/components/ui/sheet";
import ViewShipmentSheet from "../view-shipment-sheets/view-shipment-sheet";
import { Shipment } from "@prisma/client";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import BaseDataTable from "@/components/table/base-data-table";
import ConfirmDelete from "../confirm-delete";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ViewShipmentTable<TData extends Shipment, TValue>({
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
  const [deleteID, setDeleteID] = React.useState("");
  const table = useReactTable({
    data,
    columns: [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => (
          <ViewShimentRowActions
            // @ts-ignore
            row={row}
            setOpen={setOpen}
            setID={setID}
            setDeleteID={setDeleteID}
          />
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <ConfirmDelete id={deleteID} reset={() => setDeleteID("")} />
      <Sheet open={open} onOpenChange={setOpen}>
        {ID !== -1 && <ViewShipmentSheet data={data[ID]} />}
      </Sheet>
      <div className="space-y-4">
        <DataTableToolbar table={table} />
        <BaseDataTable table={table} columns={columns} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
