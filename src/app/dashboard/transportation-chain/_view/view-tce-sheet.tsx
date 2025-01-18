import { CardDescription } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Shipment, TSE } from "@prisma/client";
import { ViewTCECard } from "./view-tce-card";
import { ViewTCEFlow } from "./view-tce-flow";
import { Hubs } from "@/types/hub-location-types";
import { ShipmentDataTCE } from "../useTransportChain";

export const ViewSavedTCESheet: React.FC<{
  data?: TSE;
  open: boolean;
  setOpen: (x: boolean) => void;
}> = ({ data, open, setOpen }) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {open && data && (
        <SheetContent className="text-sm p-0 max-h-[100vh] overflow-auto flex flex-col !min-w-[80vw]">
          <SheetHeader className="flex flex-row items-start bg-muted/50 pb-2 mb-2 p-4">
            <div className="grid gap-0.5 w-full ">
              <SheetTitle className="group flex items-center gap-2 text-lg w-full">
                Transport Chain Shipment
              </SheetTitle>
              <CardDescription>
                Created:{" "}
                {data.createdAt.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </CardDescription>
            </div>
          </SheetHeader>
          <ViewTCECard
            hubs={data.hubs as Hubs[]}
            shipments={data.shipment as ShipmentDataTCE[]}
          />
          <div className="pl-4 h-full w-full pb-4">
            <ViewTCEFlow
              hubs={data.hubs as Hubs[]}
              shipments={data.shipment as ShipmentDataTCE[]}
            />
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
};
