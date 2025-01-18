"use client";

import {
  FreightCategoryMethods,
  FreightMethods,
  RoadMethods,
} from "@/types/freight-types";
import { Shipment } from "@prisma/client";

// @ts-ignore
export const CSV_HEADERS: Record<FreightMethods, string[]> = {
  [RoadMethods.COURIER]: [
    "Created At",
    "From",
    "To",
    "Category",
    "Method",
    "Origin",
    "Origin Hub",
    "Destination Hub",
    "Destination",
    "Load (MT)",
    "Distance (KM)",
    "Trip Count",
    "Well To Tank CO2e (KG)",
    "Tank To Wheel CO2e (KG)",
    "Total CO2e (KG)",
  ],
  [RoadMethods.PointToPoint]: [
    "Created At",
    "From",
    "To",
    "Category",
    "Method",
    "Origin",
    "Destination",
    "Vehicle",
    "Capacity (MT)",
    "Fuel",
    "Load (MT)",
    "Distance (KM)",
    "Trip Count",
    "WTT (KG)",
    "TTW (KG)",
    "Total CO2e (KG)",
  ],
};

// @ts-ignore
export const CSV_ROW_VALUES: Record<
  FreightMethods,
  (r: Shipment) => (string | number)[]
> = {
  [RoadMethods.COURIER]: (r) => {
    return [
      r.createdAt.toLocaleDateString(),
      r.from.toLocaleDateString(),
      r.to.toLocaleDateString(),
      r.category,
      r.method,
      '"' + r.origin + '"',

      // @ts-ignore"
      '"' + r.data.originHub + '"',

      // @ts-ignore
      '"' + r.data.destinationHub + '"',
      '"' + r.destination + '"',
      r.load,
      r.distance,
      r.count,
      r.wtt,
      r.ttw,
      r.co2e,
    ];
  },
  [RoadMethods.PointToPoint]: (r) => [
    r.createdAt.toDateString(),
    r.from.toDateString(),
    r.to.toDateString(),
    r.category,
    r.method,
    '"' + r.origin + '"',
    '"' + r.destination + '"',

    // @ts-ignore
    '"' + r.data.vehicleType + '"',

    // @ts-ignore
    r.data.capacity,

    // @ts-ignore
    r.data.fuel,
    r.load,
    r.distance,
    r.count,
    r.wtt,
    r.ttw,
    r.co2e,
  ],
};
