"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

import { Layers, X } from "lucide-react";
import DataTableDatePicker from "../../../../components/table/data-table-date-picker";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TCEViewToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const selected = table.getSelectedRowModel();
  const onExport = () => {};
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filter origin..."
          value={(table.getColumn("origin")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("origin")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableDatePicker />
      <div className="flex items-center ml-auto gap-2">
        <p className=" text-sm text-muted-foreground ">
          {selected.flatRows.length} Rows Selected
        </p>
        <Button
          variant="outline"
          disabled={selected.flatRows.length === 0}
          className="h-8 ml-auto "
          onClick={onExport}
        >
          <Layers className="h-4 w-4 mr-2" />
          <span>Export</span>
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
