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

import { Sheet } from "@/components/ui/sheet";
import { Profile, Shipment, User } from "@prisma/client";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import BaseDataTable, {
  DataTableProps,
} from "@/components/table/base-data-table";
import { ViewShimentRowActions } from "@/app/dashboard/shipment/components/shipment-table/view-shipment-row-actions";
import { DataTableToolbar } from "@/components/table/data-table-toolbar";
import { ViewUserRowActions } from "./view-user-row-actions";
import { Dialog } from "@/components/ui/dialog";
import UpdateUserDialog from "../../components/update-user-dialog";

export function ViewUsersTable<
  TData extends User & { Profile: Profile },
  TValue
>({ columns, data }: DataTableProps<TData, TValue>) {
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
          <ViewUserRowActions row={row} setOpen={setOpen} setID={setID} />
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
      {open && (
        <UpdateUserDialog user={data[ID]} open={open} setOpen={setOpen} />
      )}
      <div className="space-y-4">
        <DataTableToolbar
          table={table}
          placeholder="Search email..."
          searchFilter="email"
        />
        <BaseDataTable table={table} columns={columns} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
