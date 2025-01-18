"use client";

import DatePickerFormInput from "@/components/form/date-picker-form-input";
import { DateRangePicker } from "@/components/form/date-range-picker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { SquareGanttChart } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

export default function PDFLink() {
  const [date, setDate] = useState({
    from: new Date(),
    to: moment().add(1, "day").toDate(),
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onGenerate = () => {
    router.push(
      "/dashboard/shipment/pdf?from=" +
        date?.from?.toLocaleDateString() +
        "&to=" +
        date?.to?.toLocaleDateString()
    );
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <InteractiveHoverButton>
          <div className="flex items-center gap-2">
          <SquareGanttChart className="h-4 w-4 mr-2" /> PDF Report
          </div>
        </InteractiveHoverButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate PDF</AlertDialogTitle>
          <AlertDialogDescription>
            Select Date Range | From - To
          </AlertDialogDescription>

          <DateRangePicker
            date={date as DateRange}
            setDate={setDate as SelectRangeEventHandler}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onGenerate}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
