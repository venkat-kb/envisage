"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable } from "./_table/bulk-processing-data-table";
import { columns } from "./_table/columns";
import { BulkValidateShipmentData } from "./page";
import { MutableRefObject } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

const BulkDataDialog: React.FC<{
  open: boolean;
  setOpen: (x: boolean) => void;
  data: BulkValidateShipmentData[];
  processing: boolean;
  rowCount: number;
  onSave: () => void;
}> = ({ open, setOpen, data, processing, rowCount, onSave }) => {
  const count = data.reduce(
    (acc, curr) => acc + (curr.status === 1 ? 1 : 0),
    0
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="min-w-max max-h-[80vh] overflow-auto min-h-max flex justify-normal flex-col"
        id="bulk-table"
      >
        <DialogHeader className="sticky top-0 backdrop-blur-sm  z-[1000] mr-4">
          <div className="flex justify-between ">
            <DialogTitle>Processing Bulk Data</DialogTitle>
            <Button
              disabled={processing || data.length === 0}
              className="mr-4 gap-2"
              onClick={onSave}
            >
              {processing ? (
                <>
                  Processing...{" "}
                  <Icons.spinner className="h-4 w-4 animate-spin text-blue-500" />
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>

          <DialogDescription>
            Processed {count} / {rowCount} row(s){" "}
          </DialogDescription>
        </DialogHeader>
        <DataTable columns={columns} data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default BulkDataDialog;
