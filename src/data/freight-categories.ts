import {
  FreightCategories,
  FreightMethods,
  RailwayMethods,
  RoadMethods,
} from "@/types/freight-types";

import { PlaneTakeoff, Ship, TrainFront, Truck } from "lucide-react";
import { Icon } from "./sidenav-items";

export const FreightMethodsMap: Record<
  FreightCategories,
  { href: string; label: FreightMethods; tooltip: string }[]
> = {
  [FreightCategories.RAILWAY]: [
    {
      label: RailwayMethods.Standard,
      href: "/dashboard/shipment/new/standard-rail",
      tooltip: "Standard Rail Freight",
    },
  ],
  [FreightCategories.ROADWAYS]: [
    {
      href: "/dashboard/shipment/new/point-to-point",
      label: RoadMethods.PointToPoint,
      tooltip:
        "Direct shipping method where cargo moves from its origin to its destination without any transshipment.",
    },
    {
      href: "/dashboard/shipment/new/courier",
      label: RoadMethods.COURIER,
      tooltip:
        "Surface Express Service is a premium road transportation solution offered by logistics companies such as Gati, Safexpress, TCI Express and others in India. This service is designed to provide faster delivery of goods across various locations within the country using surface (road) transport. There are three legs of transportation – first-mile from origin to logistics company hub, mid mile from logistics company origin hub to destination hub and last mile from destination hub to final destination. PTL by road refers to a freight transportation method where goods from multiple shippers are consolidated into a single truck. These are similar to parcel serves by road in India. This service is designed to provide cost effective delivery of goods across various locations within the country using surface (road) transport. There are three legs of transportation – first-mile from origin to transportation company hub, mid mile from transportation company origin hub to destination hub and last mile from destination hub to final destination. Here the shipper gets to choose the vehicle type for each phase of transportation based on the cargo weight and type.",
    },
  ],
};

export const FreightCategoryIcons: Record<FreightCategories, Icon> = {
  Rail: TrainFront,
  Road: Truck,
};
