"use client";

import { FreightCategoryIcons } from "@/data/freight-categories";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Fragment } from "react";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import {
  CompareCardData,
  EmissionDetails,
  TransitDetails,
} from "@/app/dashboard/compare/components/compare-card";

const transitText = (index: number, length: number) => {
  return `Leg ${index + 1} of ${length}`;
};

export type EWayData = (TransitDetails & EmissionDetails)[];
const EWaySheet: React.FC<{
  data: EWayData;
  isCompare?: boolean;
}> = ({ data, isCompare = true }) => {
  //   const Icon = FreightCategoryIcons[data.category];
  return (
    <SheetContent className="max-h-[100vh] overflow-auto flex flex-col min-w-[500px]">
      <SheetHeader>
        <SheetTitle className="flex items-center">
          EWay Bill Transit Details
        </SheetTitle>
      </SheetHeader>
      {data.map((item, index) => {
        const Icon = FreightCategoryIcons[item.category];
        return (
          <Fragment key={index}>
            <div className="grid gap-3 p-4">
              <div className="font-semibold flex items-center">
                <Icon className="h-6 w-6 mr-2" />
                {transitText(index, data.length)} Transit Details
              </div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Origin</span>
                  <span className="font-semibold max-w-[250px] truncate">
                    {item.origin}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-semibold max-w-[250px] truncate">
                    {item.destination}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-semibold ">
                    {item.distance.toFixed(0)} KM
                  </span>
                </li>
              </ul>
              <div className="font-semibold">Emission</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Well To Tank</span>
                  <KgOrTonneCo2e val={item.wtt} />
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tank to Wheel</span>
                  <KgOrTonneCo2e val={item.ttw} />
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <KgOrTonneCo2e val={item.co2e} />
                </li>
              </ul>
            </div>
            {index !== data.length - 1 && (
              <hr className="border-t text-muted-foreground" />
            )}
          </Fragment>
        );
      })}
    </SheetContent>
  );
};

export default EWaySheet;
