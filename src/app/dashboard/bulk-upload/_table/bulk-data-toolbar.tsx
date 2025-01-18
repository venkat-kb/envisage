"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import DataTableDatePicker from "@/components/table/data-table-date-picker";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function BulkDataToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filter reference ID..."
          value={
            (table.getColumn("referenceID")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("referenceID")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
