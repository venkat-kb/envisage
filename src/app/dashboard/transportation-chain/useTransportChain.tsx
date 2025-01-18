import { ShipmentData } from "@/types/freight-data";
import { FreightCategories } from "@/types/freight-types";
import { FreightHubs, Hubs } from "@/types/hub-location-types";
import { useState } from "react";

export const HubFreightCategoryMap: Record<FreightHubs, FreightCategories> = {
  Airport: FreightCategories.AIRWAYS,
  "Coastal Port": FreightCategories.WATERWAYS,
  "Railway Station": FreightCategories.RAILWAY,
  "Land Hub": FreightCategories.ROADWAYS,
};

export type ShipmentDataTCE = Omit<ShipmentData, "from" | "to">;
export const useTransportChain = () => {
  const [hubs, setHubs] = useState<Hubs[]>([]);
  const [shipments, setShipments] = useState<ShipmentDataTCE[]>([]);
  const getFreightCategories = (currentHubType: FreightHubs) => {
    if (
      hubs[hubs.length - 1].type === currentHubType &&
      currentHubType !== FreightHubs.LandHub
    ) {
      return [
        HubFreightCategoryMap[currentHubType],
        FreightCategories.ROADWAYS,
      ];
    } else return [FreightCategories.ROADWAYS];
  };

  return { getFreightCategories, hubs, setHubs, shipments, setShipments };
};
