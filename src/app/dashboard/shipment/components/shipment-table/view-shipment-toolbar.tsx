"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";

import { Cross, Layers, Layers2, Layers3, X } from "lucide-react";
import { Shipment } from "@prisma/client";
import DataTableDatePicker from "@/components/table/data-table-date-picker";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const selected = table.getSelectedRowModel();
  const onExport = () => {
    const data: (number | string)[][] = [
      [
        "Created At",
        "From",
        "To",
        "Category",
        "Method",
        "Origin",
        "Destination",
        "Load (MT)",
        "Distance (KM)",
        "WTT (MT)",
        "TTW (MT)",
        "CO2e (MT)",
      ],
    ];
    selected.flatRows.map((row) => {
      const r = row.original as Shipment;
      data.push([
        r.createdAt.toLocaleDateString(),
        r.from.toLocaleDateString(),
        r.to.toLocaleDateString(),
        r.category,
        r.method,
        '"' + r.origin + '"',
        '"' + r.destination + '"',
        r.load,
        r.distance,
        r.wtt,
        r.ttw,
        r.co2e,
      ]);
    });
    const csv = data.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8," });
    const objUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objUrl;
    a.download = "GHG_EMISSIONS.csv";
    a.click();
  };
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
        {table.getColumn("Freight Type") && (
          <DataTableFacetedFilter
            column={table.getColumn("Freight Type")}
            title="Freight Type"
            options={[
              {
                label: "Air",
                value: "Air",
              },
              {
                label: "Water",
                value: "Water",
              },
              {
                label: "Road",
                value: "Road",
              },
              {
                label: "Rail",
                value: "Rail",
              },
            ]}
          />
        )}

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

      {/* <DataTableDatePicker /> */}
      <div className="flex items-center ml-auto gap-2">
        <p className=" text-sm text-muted-foreground ">
          {selected.flatRows.length} Rows Selected
        </p>
        <Button
          variant="outline"
          disabled={selected.flatRows.length === 0}
          className="h-8  ml-auto "
          onClick={onExport}
        >
          <Layers className="h-4 w-4 mr-2" />
          <span>Export CSV</span>
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
