"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "../../../../../components/ui/input";

import { Shipment } from "@prisma/client";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const selected = table.getSelectedRowModel();
  const onExport = () => {
    const data: (number | string)[][] = [
      [
        "Created At",
        "From",
        "To",
        "Category",
        "Method",
        "Load (MT)",
        "Distance (KM)",
        "WTT (KG)",
        "TTW (KG)",
        "CO2e (KG)",
      ],
    ];
    selected.flatRows.map((row) => {
      const r = row.original as Shipment;
      data.push([
        r.createdAt.toDateString(),
        r.from.toDateString(),
        r.to.toDateString(),
        r.category,
        r.method,
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
    a.download = "download.csv";
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
      </div>

      <div className="flex items-center ml-auto gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
