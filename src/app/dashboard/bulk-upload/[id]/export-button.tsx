"use client";
import { Button } from "@/components/ui/button";
import {
  FreightCategories,
  FreightCategoryMethods,
  FreightMethods,
} from "@/types/freight-types";
import { Shipment } from "@prisma/client";
import { SheetIcon, SquareGanttChart } from "lucide-react";
import { CSV_HEADERS, CSV_ROW_VALUES } from "./csv-headers";

const BulkExportButton: React.FC<{
  data: Shipment[];
  name: string;
  method: FreightMethods;
}> = ({ data, name, method }) => {
  const onExport = () => {
    "use client";
    const csvData: (number | string)[][] = [[...CSV_HEADERS[method]]];
    data.map((r) => {
      csvData.push(CSV_ROW_VALUES[method](r));
    });
    const csv = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8," });
    const objUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objUrl;
    a.download = name + ".csv";
    a.click();
  };
  return (
    <Button variant="outline" onClick={onExport}>
      <SheetIcon className="h-4 w-4 mr-2" />
      Export CSV Report
    </Button>
  );
};

export default BulkExportButton;
