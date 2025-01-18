"use client";
import { DateRangePicker } from "@/components/form/date-range-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

const ConfirmTSEDialog: React.FC<{
  onSave: () => void;
  open: boolean;
  date: DateRange;
  setDate: SelectRangeEventHandler;
  setOpen: (x: boolean) => void;
}> = ({ open, setOpen, onSave, date, setDate }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transport Chain Shipment</DialogTitle>
          <DialogDescription>
            Kindly enter the shipment period.
          </DialogDescription>
        </DialogHeader>
        <div>
          <DateRangePicker date={date} setDate={setDate} />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onSave();
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmTSEDialog;
