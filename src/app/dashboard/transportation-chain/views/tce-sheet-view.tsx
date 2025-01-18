import { FreightCategoryIcons } from "@/data/freight-categories";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FreightCategories } from "@/types/freight-types";
import { Pencil, RefreshCcw, Trash, Truck } from "lucide-react";
const TCESheetView: React.FC<{
  origin: string;
  destination: string;
  distance: number;
  ttw: number;
  wtt: number;
  co2e: number;
  category: FreightCategories;
}> = ({ co2e, destination, distance, category, origin, ttw, wtt }) => {
  const Icon = FreightCategoryIcons[category];
  return (
    <SheetContent className="text-sm p-0 max-h-[100vh] overflow-auto flex flex-col">
      <SheetHeader className="flex flex-row items-start bg-muted/50 pb-2 mb-2 p-4">
        <div className="grid gap-0.5 w-full ">
          <SheetTitle className="group flex items-center gap-2 text-lg w-full">
            {<Icon />} {category} Shipment
          </SheetTitle>
        </div>
      </SheetHeader>

      <div className="grid gap-3 p-4">
        <div className="font-semibold">Transit Details</div>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between ">
            <span className="text-muted-foreground">Origin</span>
            <span className="font-semibold  max-w-[200px] line-clamp-1">
              {origin}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground ">Destination</span>
            <span className="font-semibold max-w-[200px] line-clamp-1">
              {destination}
            </span>
          </li>
          <li className="flex items-center justify-between ">
            <span className="text-muted-foreground">Distance</span>
            <span className="font-semibold">{distance.toFixed(0)} KM</span>
          </li>
        </ul>
        <Separator className="my-2" />

        <div className="font-semibold">Emission</div>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Well To Tank</span>
            <KgOrTonneCo2e val={ttw} />
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Tank to Wheel</span>
            <KgOrTonneCo2e val={wtt} />
          </li>

          <li className="flex items-center justify-between font-semibold">
            <span className="text-muted-foreground">Total</span>
            <KgOrTonneCo2e val={co2e} />
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-3 gap-3 px-4 mt-auto pb-4">
        <Button variant="secondary">
          <Pencil className="mr-2 h-3 w-3" />
          Edit
        </Button>
        <Button className="text-xs">
          <RefreshCcw className="mr-2 h-3 w-3" /> Recreate
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-3 w-3" /> Delete
        </Button>
      </div>
    </SheetContent>
  );
};

export default TCESheetView;
