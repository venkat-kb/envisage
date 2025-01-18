"use client";
import { useEffect, useState } from "react";
import CompareInputForm from "./components/input-form";
import { ICompareValidator } from "@/lib/validators/compare-validator";
import { FreightCategories } from "@/types/freight-types";
import { useToast } from "@/components/ui/use-toast";
import CompareCard, { CompareCardData } from "./components/compare-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  calculateAirDistance,
  calculateCoastalDistance,
  calculateRailDistance,
  calculateRoadDistance,
  findClosestAirport,
  findClosestCoastalPort,
} from "../shipment/new/api/calculate-distance";
import {
  RAIL_TTW,
  RAIL_WTT,
} from "../shipment/new/api/calculate-emission/rail";
import {
  AIR_TTW_DOMESTIC,
  AIR_WTT_DOMESTIC,
} from "../shipment/new/api/calculate-emission/air";
import { Icons } from "@/components/ui/icons";
import { geocode } from "@googlemaps/google-maps-services-js/dist/geocode/geocode";
import { geoCodeLocation } from "../shipment/new/api/auto-complete";
import { Sheet } from "@/components/ui/sheet";
import ExpandedSheet from "./components/expanded-sheet";
import { Slider } from "@/components/ui/slider";
import SliderWithoutThumb from "@/components/slider-without-thumb";

export default function Page() {
  const [state, setState] = useState<0 | 1 | 2>(0);
  const [data, setData] = useState<CompareCardData[]>([
    // {
    //   category: FreightCategories.ROADWAYS,
    //   data: [
    //     {
    //       origin: "Mumbai",
    //       destination: "Delhi",
    //       distance: 1000,
    //       wtt: 27,
    //       ttw: 89,
    //       co2e: 116,
    //       category: FreightCategories.ROADWAYS,
    //     },
    //   ],
    // },
    // {
    //   category: FreightCategories.ROADWAYS,
    //   data: [
    //     {
    //       origin: "Mumbai",
    //       destination: "Delhi",
    //       distance: 1000,
    //       wtt: 27,
    //       ttw: 89,
    //       co2e: 116,
    //       category: FreightCategories.ROADWAYS,
    //     },
    //   ],
    // },
  ]);

  const [expanded, setExpanded] = useState<number>(-1);
  const [open, setOpen] = useState(false);
  const [length, setLength] = useState(1);
  const onSave = async (
    data: ICompareValidator,
    categories: FreightCategories[]
  ) => {
    setData([]);
    setState(2);
    setLength(categories.length);
    // Calcualte Air Emissions
    if (categories.includes(FreightCategories.AIRWAYS)) {
      const originGeocode = await geoCodeLocation(data.origin);
      const destinationGeocode = await geoCodeLocation(data.destination);

      const originAirport: any = await findClosestAirport(originGeocode);
      const destinationAirport: any = await findClosestAirport(
        destinationGeocode
      );

      // First Mile
      const firstMileDistance = await calculateRoadDistance(
        data.origin,
        originAirport.name
      );
      const firstMileTTW = firstMileDistance * 0.089;
      const firstMileWTT = firstMileDistance * 0.027;

      // Mid Mile
      const midMileDistace = await calculateAirDistance(
        originAirport.name,
        destinationAirport.name
      );
      const midMileTTW = midMileDistace * AIR_TTW_DOMESTIC;
      const midMileWTT = midMileDistace * AIR_WTT_DOMESTIC;

      // Last Mile
      const lastMileDistance = await calculateRoadDistance(
        destinationAirport.name,
        data.destination
      );
      const lastMileTTW = lastMileDistance * 0.089;
      const lastMileWTT = lastMileDistance * 0.027;

      const airData: CompareCardData = {
        category: FreightCategories.AIRWAYS,
        data: [
          {
            origin: data.origin,
            destination: originAirport.name,
            distance: firstMileDistance,
            wtt: firstMileWTT,
            ttw: firstMileTTW,
            co2e: firstMileTTW + firstMileWTT,
            category: FreightCategories.ROADWAYS,
          },
          {
            origin: originAirport.name,
            destination: destinationAirport.name,
            distance: midMileDistace,
            wtt: midMileWTT,
            ttw: midMileTTW,
            co2e: midMileTTW + midMileWTT,
            category: FreightCategories.AIRWAYS,
          },
          {
            origin: destinationAirport.name,
            destination: data.destination,
            distance: lastMileDistance,
            wtt: lastMileWTT,
            ttw: lastMileTTW,
            co2e: lastMileTTW + lastMileWTT,
            category: FreightCategories.ROADWAYS,
          },
          {
            origin: data.origin,
            destination: data.destination,
            distance: firstMileDistance + midMileDistace + lastMileDistance,
            wtt: firstMileWTT + midMileWTT + lastMileWTT,
            ttw: firstMileTTW + midMileTTW + lastMileTTW,
            co2e:
              firstMileTTW +
              midMileTTW +
              lastMileTTW +
              firstMileWTT +
              midMileWTT +
              lastMileWTT,
            category: FreightCategories.AIRWAYS,
          },
        ],
      };
      setData((d) => [...d, airData]);
    }

    // Calculate Road Emission
    if (categories.includes(FreightCategories.ROADWAYS)) {
      const roadDistance = await calculateRoadDistance(
        data.origin,
        data.destination
      );
      const roadEmissionTTW = roadDistance * 0.089;
      const roadEmissionWTT = roadDistance * 0.027;
      const roadData: CompareCardData = {
        category: FreightCategories.ROADWAYS,
        data: [
          {
            origin: data.origin,
            destination: data.destination,
            distance: roadDistance,
            wtt: roadEmissionWTT,
            ttw: roadEmissionTTW,
            co2e: roadEmissionTTW + roadEmissionWTT,
            category: FreightCategories.ROADWAYS,
          },
        ],
      };
      setData((d) => [...d, roadData]);
    }

    // Calculate Rail Emission
    if (categories.includes(FreightCategories.RAILWAY)) {
      const railDistance = await calculateRailDistance(
        data.origin,
        data.destination
      );
      const TTW = RAIL_TTW * railDistance;
      const WTT = RAIL_WTT * railDistance;
      const railData: CompareCardData = {
        category: FreightCategories.RAILWAY,
        data: [
          {
            origin: data.origin,
            destination: data.destination,
            distance: railDistance,
            wtt: WTT,
            ttw: TTW,
            co2e: TTW + WTT,
            category: FreightCategories.RAILWAY,
          },
        ],
      };
      setData((d) => [...d, railData]);
    }

    if (categories.includes(FreightCategories.WATERWAYS)) {
      const originGeocode = await geoCodeLocation(data.origin);
      const destinationGeocode = await geoCodeLocation(data.destination);
      const originPort = await findClosestCoastalPort(originGeocode);
      const destinationPort = await findClosestCoastalPort(destinationGeocode);

      const firstMileDistance = await calculateRoadDistance(
        data.origin,
        originPort.origin
      );
      const firstMileTTW = firstMileDistance * 0.089;
      const firstMileWTT = firstMileDistance * 0.027;

      const midMileDistance = await calculateCoastalDistance(
        originPort.origin,
        destinationPort.origin
      );
      const midMileTTW = midMileDistance * 0.015;
      const midMileWTT = midMileDistance * 0.005;

      const lastMileDistance = await calculateRoadDistance(
        destinationPort.origin,
        data.destination
      );

      const lastMileTTW = lastMileDistance * 0.089;
      const lastMileWTT = lastMileDistance * 0.027;

      const coastalData: CompareCardData = {
        category: FreightCategories.WATERWAYS,
        data: [
          {
            origin: data.origin,
            destination: originPort.origin,
            distance: firstMileDistance,
            wtt: firstMileWTT,
            ttw: firstMileTTW,
            co2e: firstMileTTW + firstMileWTT,
            category: FreightCategories.ROADWAYS,
          },
          {
            origin: originPort.origin,

            destination: destinationPort.origin,
            distance: midMileDistance,
            wtt: midMileWTT,
            ttw: midMileTTW,
            co2e: midMileTTW + midMileWTT,
            category: FreightCategories.WATERWAYS,
          },
          {
            origin: destinationPort.origin,
            destination: data.destination,
            distance: lastMileDistance,
            wtt: lastMileWTT,
            ttw: lastMileTTW,
            co2e: lastMileTTW + lastMileWTT,
            category: FreightCategories.ROADWAYS,
          },
          {
            origin: data.origin,
            destination: data.destination,
            distance: firstMileDistance + midMileDistance + lastMileDistance,
            wtt: firstMileWTT + midMileWTT + lastMileWTT,
            ttw: firstMileTTW + midMileTTW + lastMileTTW,
            co2e:
              firstMileTTW +
              midMileTTW +
              lastMileTTW +
              firstMileWTT +
              midMileWTT +
              lastMileWTT,
            category: FreightCategories.WATERWAYS,
          },
        ],
      };
      setData((d) => [...d, coastalData]);
    }
    setState(1);
  };

  const getLeastEmission = () => {
    let leastEmissionIndex = 0;
    if (data.length === 0) {
      return 0;
    }

    data.forEach((d, i) => {
      if (
        d.data[d.data.length - 1].co2e <
        data[leastEmissionIndex].data[data[leastEmissionIndex].data.length - 1]
          .co2e
      ) {
        leastEmissionIndex = i;
      }
    });
    return leastEmissionIndex;
  };
  const leastEmissionIndex = getLeastEmission();

  const onReset = () => {
    setState(0);
    setData([]);
  };

  return (
    <div
      style={{
        transition: "width 0.5s ease-in-out",
      }}
      className="flex w-full justify-center gap-8"
    >
      <CompareInputForm onSave={onSave} data={data} />

      {state === 2 && (
        <div className="p-4 flex max-h-max h-[max-content] mt-40 items-center justify-center flex-col gap-2 bg-black/80 rounded">
          <Icons.spinner className="animate-spin text-white" />
          <SliderWithoutThumb
            className="w-[200px] "
            value={[(data.length / length) * 100 + 10]}
          />
        </div>
      )}

      {state === 1 && (
        <>
          <Sheet open={open} onOpenChange={setOpen}>
            {open && <ExpandedSheet data={data[expanded]} />}
          </Sheet>

          <div className={`grid grid-cols-2 w-full gap-4`}>
            {data.map((d, i) => (
              <CompareCard
                data={d}
                key={i}
                delay={i + 1}
                setExpanded={() => {
                  setExpanded(i);
                  setOpen(true);
                }}
                least={i === leastEmissionIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
