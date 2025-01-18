"use client";
import BaseDataTable, {
  DataTableProps,
} from "@/components/table/base-data-table";
import { RoadVehicle } from "@prisma/client";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ViewUserRowActions } from "../../users/_table/view-user-row-actions";
import { DataTableToolbar } from "@/components/table/data-table-toolbar";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import UpdateRoadEmissionDialog from "../../components/update-road-emissions-dialog";

export default function ViewRoadEmissionsTable<
  TData extends RoadVehicle,
  TValue
>({ columns, data }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState(-1);
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
        <UpdateRoadEmissionDialog
          open={open}
          setOpen={setOpen}
          emission={data[ID]}
        />
      )}
      <div className="space-y-4">
        <DataTableToolbar
          table={table}
          placeholder="Search type..."
          searchFilter="type"
        />
        <BaseDataTable table={table} columns={columns} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
