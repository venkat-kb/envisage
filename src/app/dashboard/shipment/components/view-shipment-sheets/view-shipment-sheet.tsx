import { FreightCategoryIcons } from "@/data/freight-categories";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Shipment } from "@prisma/client";
import { Pencil, RefreshCcw, Trash, Truck } from "lucide-react";

const ViewShipmentSheet: React.FC<{ data: Shipment }> = ({ data }) => {
  const Icon =
    FreightCategoryIcons[data.category as keyof typeof FreightCategoryIcons];
  return (
    <SheetContent className="text-sm p-0 max-h-[100vh] overflow-auto flex flex-col">
      <SheetHeader className="flex flex-row items-start bg-muted/50 pb-2 mb-2 p-4">
        <div className="grid gap-0.5 w-full ">
          <SheetTitle className="group flex items-center gap-2 text-lg w-full">
            <Icon /> {data.category} Shipment
          </SheetTitle>
          <CardDescription>
            Created:{" "}
            {data.createdAt.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </CardDescription>
          <CardDescription>
            Transit Between:{" "}
            {data.from.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            -{" "}
            {data.to.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </CardDescription>
        </div>
      </SheetHeader>

      <div className="grid gap-3 p-4">
        <div className="font-semibold">Transit Details</div>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Origin</span>
            <span className="font-semibold max-w-[200px] line-clamp-1">
              {data.origin}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Destination</span>
            <span className="font-semibold max-w-[200px] line-clamp-1">
              {data.destination}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Distance</span>
            <span className="font-semibold ">
              {data.distance.toFixed(0)} KM
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Load</span>
            <span className="font-semibold ">{data.load.toFixed(1)} MT</span>
          </li>
        </ul>
        <Separator className="my-4" />
        <div className="font-semibold">Emission</div>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Trip Count</span>
            <span className="font-semibold ">{data.count}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Well To Tank</span>
            <KgOrTonneCo2e val={data.wtt} />
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Tank to Wheel</span>
            <KgOrTonneCo2e val={data.ttw} />
          </li>

          <li className="flex items-center justify-between font-semibold">
            <span className="text-muted-foreground">Total Emission</span>
            <KgOrTonneCo2e val={data.co2e} />
          </li>
          <li className="flex items-center justify-between font-semibold">
            <span className="text-muted-foreground">Emission Intensity</span>
            <KgOrTonneCo2e isIntensity val={data.co2e / data.load} />
          </li>
        </ul>
      </div>
    </SheetContent>
  );
};

export default ViewShipmentSheet;
