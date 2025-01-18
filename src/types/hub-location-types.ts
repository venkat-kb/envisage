import { FreightCategories } from "./freight-types";

export enum FreightHubs {
  Airport = "Airport",
  RailwayStation = "Railway Station",
  CoastalPort = "Coastal Port",
  LandHub = "Land Hub",
}

export enum TCETransportation {
  Truck,
  Airplane,
  Ship,
  Train,
}

export const TCEFreightTransportationMap = {
  [FreightCategories.ROADWAYS]: TCETransportation.Truck,
  [FreightCategories.AIRWAYS]: TCETransportation.Airplane,
  [FreightCategories.WATERWAYS]: TCETransportation.Ship,
  [FreightCategories.RAILWAY]: TCETransportation.Train,
};

export type Hubs = {
  type: FreightHubs;
  name: string;
  load?: number | undefined;
  freight?: FreightCategories | undefined;
  vehicleType?: string | undefined;
  capacity?: string | undefined;
  fuel?: string | undefined;
};
