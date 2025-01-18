import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import EwayMap from "./eway-map";
import { CompareCardData } from "@/app/dashboard/compare/components/compare-card";
import { FreightCategories } from "@/types/freight-types";
import { Sheet } from "@/components/ui/sheet";
import ExpandedSheet from "@/app/dashboard/compare/components/expanded-sheet";
import EWaySheet, { EWayData } from "./eway-sheet";

function EWayCard() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const data: EWayData = [
    {
      category: FreightCategories.ROADWAYS,
      co2e: 96.64,
      destination: "Indira Gandhi Airport, New Delhi",
      distance: 105,
      origin: "Panipat, Haryana",
      wtt: 18.1,
      ttw: 78.54,
    },
    {
      category: FreightCategories.AIRWAYS,
      co2e: 15008.9,
      origin: "Delhi",
      destination: "Bangalore",
      distance: 1000,
      wtt: 2002.2,
      ttw: 13006.6,
    },
    {
      category: FreightCategories.RAILWAY,
      co2e: 46.6,
      origin: "Bangalore City Railway Station",
      destination: "Kerala Railway Station",
      distance: 1000,
      wtt: 28.2,
      ttw: 18.4,
    },
    {
      category: FreightCategories.WATERWAYS,
      co2e: 100.0,
      origin: "Kerala Port",
      destination: "Mumbai Port",
      distance: 1000,
      wtt: 49.5,
      ttw: 30.5,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <Card className=" min-w-[50%] max-w-[60%]" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="flex justify-between w-full ">
          <CardTitle className="group flex items-center gap-2 text-lg w-full justify-between">
            Shipment
          </CardTitle>
          <div className="flex gap-2">
            <Button
              className="w-[100px] ml-4"
              variant="outline"
              onClick={() => setOpen(true)}
            >
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Expand
            </Button>
            <Button
              type="submit"
              className="w-[100px] ml-4"
              disabled={loading}
              // onClick={onSave}
              variant="outline"
            >
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm space-y-4">
        <div className="flex items-center space-x-4 ">
          <div className="flex-1">
            <div className="font-semibold">Transit Details</div>
            <ul className="grid gap-1 w-full">
              <li className="flex items-center justify-between gap-2 ">
                <span className="text-muted-foreground">Origin</span>
                <span className="font-semibold max-w-[200px]  line-clamp-1">
                  Indira Gandhi Airport, New delhi
                </span>
              </li>
              <li className="flex items-center justify-between gap-2 ">
                <span className="text-muted-foreground">Destination</span>
                <span className="font-semibold max-w-[200px] line-clamp-1">
                  Mumbai, Maharashtra
                </span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-semibold">1493 KM</span>
              </li>
            </ul>
          </div>
          <Separator orientation="vertical" />
          <div className="flex-1">
            <div className="font-semibold">Emission</div>
            <ul className="grid gap-1 w-full">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Well To Tank</span>
                <KgOrTonneCo2e val={2486.3} />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Tank to Wheel</span>
                <KgOrTonneCo2e val={21246.9} />
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total Emission</span>
                <KgOrTonneCo2e val={23733.2} />
              </li>
            </ul>
          </div>
        </div>
        <Separator />
        <EwayMap />
      </CardContent>
      <Sheet open={open} onOpenChange={setOpen}>
        {open && <EWaySheet data={data} />}
      </Sheet>
    </Card>
  );
}

export default EWayCard;
