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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { TCEViewToolbar } from "./tce-view-toolbar";
import { DataTableRowActions } from "./tce-view-row-actions";
import { Sheet } from "@/components/ui/sheet";
import { TSE } from "@prisma/client";
import { ViewSavedTCESheet } from "../_view/view-tce-sheet";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import BaseDataTable from "@/components/table/base-data-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TCEViewDataTable<TData extends TSE, TValue>({
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <ViewSavedTCESheet
        data={ID !== -1 ? data[ID] : undefined}
        open={open}
        setOpen={setOpen}
      />
      <div className="space-y-4">
        <TCEViewToolbar table={table} />
        <BaseDataTable table={table} columns={columns} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
