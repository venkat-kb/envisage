import {
  AirMethods,
  FreightCategories,
  FreightMethods,
  RailwayMethods,
  RoadMethods,
  WaterMethods,
} from "./freight-types";

export type BaseShipmentData<
  T extends FreightCategories,
  U extends FreightMethods
> = {
  id?: string;
  category: T;
  method: U;
  origin: string;
  destination: string;
  from: Date;
  to: Date;
  load: number;
  distance: number;
  wtt: number;
  ttw: number;
  co2e: number;
  count: number;
};

export type ExtendedShipmentData<
  T extends FreightCategories,
  U extends FreightMethods,
  X
> = BaseShipmentData<T, U> & {
  data: X;
};

export type RoadShipmentData = ExtendedShipmentData<
  FreightCategories.ROADWAYS,
  RoadMethods.PointToPoint,
  {
    vehicleType: string;
    fuel: string;
    capacity: string;
    isRefrigerated: boolean;
  }
>;
export type CourierShipmentData = ExtendedShipmentData<
  FreightCategories.ROADWAYS,
  RoadMethods.COURIER,
  {
    originHub: string;
    destinationHub: string;
    firstMileCo2e: number;
    firstMileTTW: number;
    firstMileWTT: number;
    midMileCo2e: number;
    midMileTTW: number;
    midMileWTT: number;
    lastMileCo2e: number;
    lastMileTTW: number;
    lastMileWTT: number;
    transShipment: number;
  }
>;

export type AirShipmentData = ExtendedShipmentData<
  FreightCategories.AIRWAYS,
  AirMethods.DOMESTIC | AirMethods.INTERNATIONAL,
  {}
>;
export type RailShipmentData = ExtendedShipmentData<
  FreightCategories.RAILWAY,
  RailwayMethods.Standard,
  {}
>;

export type CoastalShipmentData = ExtendedShipmentData<
  FreightCategories.WATERWAYS,
  WaterMethods.COASTAL,
  { type: string; size: string }
>;

export type InternationalWaterShipmentData = ExtendedShipmentData<
  FreightCategories.WATERWAYS,
  WaterMethods.INTERNATIONAL_WATER,
  { type: string; size: string }
>;

export type ShipmentData =
  | RoadShipmentData
  | AirShipmentData
  | RailShipmentData
  | CourierShipmentData
  | CoastalShipmentData
  | InternationalWaterShipmentData;
