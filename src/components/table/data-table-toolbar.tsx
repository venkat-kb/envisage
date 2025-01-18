"use client";

import { Table } from "@tanstack/react-table";

import { Cross, Layers, Layers2, Layers3, X } from "lucide-react";
import { Shipment } from "@prisma/client";
import DataTableDatePicker from "@/components/table/data-table-date-picker";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Input } from "../ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchFilter: string;
  placeholder: string;
}

export function DataTableToolbar<TData>({
  table,
  placeholder,
  searchFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const selected = table.getSelectedRowModel();

  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={
            (table.getColumn(searchFilter)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchFilter)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>

      <div className="flex items-center ml-auto gap-2">
        <p className=" text-sm text-muted-foreground ">
          {selected.flatRows.length} Rows Selected
        </p>

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
