import { FreightCategoryIcons } from "@/data/freight-categories";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FreightCategories } from "@/types/freight-types";
import { ExternalLink } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export type CompareCardData = {
  category: FreightCategories;
  data: (TransitDetails & EmissionDetails)[];
};

export type TransitDetails = {
  category: FreightCategories;
  origin: string;
  destination: string;
  distance: number;
};

export type EmissionDetails = {
  wtt: number;
  ttw: number;
  co2e: number;
};

const CompareCard: React.FC<{
  data: CompareCardData;
  delay: number;
  setExpanded: () => void;
  least: boolean;
}> = ({ data, delay, setExpanded, least }) => {
  const [transition, setTransition] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTransition(true);
    }, delay * 500);
  }, []);
  const Icon = FreightCategoryIcons[data.category];
  const item = data.data[data.data.length - 1];
  return (
    <Card
      className={`bg-slate-100 h-max max-h-max relative overflow-auto transition-opacity ease-in duration-${
        delay * 200
      } ${transition ? "opacity-100" : "opacity-0"}`}
    >
      {data.data.length > 1 && (
        <Button className="absolute top-4 right-4" onClick={setExpanded}>
          <span className="relative flex h-3 w-3 mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          Expand
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      )}
      <CardHeader className="pb-0">
        <CardTitle className="flex items-end">
          <Icon className="h-6 w-6 mr-2" />
          {data.category}ways
          {least && (
            <span className="relative flex h-3 w-3 ml-3 mb-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          )}
        </CardTitle>
        <CardDescription>
          {data.data.length > 1 ? "Chain Transit" : "Direct Transit"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Fragment>
          <div className="grid gap-3 p-4">
            <div className="font-semibold flex items-center">
              Transit Details
            </div>
            <ul className="grid gap-3">
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
                <span className="text-muted-foreground">Total Emission</span>
                <KgOrTonneCo2e val={item.co2e} />
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">
                  Emission Intensity
                </span>
                <KgOrTonneCo2e isIntensity val={item.co2e} />
              </li>
            </ul>
          </div>
          {/* {index !== data.data.length - 1 && (
                <hr className="border-t text-muted-foreground" />
              )} */}
        </Fragment>
        {/* );
        })} */}
      </CardContent>
    </Card>
  );
};

export default CompareCard;
