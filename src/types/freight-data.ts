import {
  FreightCategories,
  FreightMethods,
  RailwayMethods,
  RoadMethods,
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

export type RailShipmentData = ExtendedShipmentData<
  FreightCategories.RAILWAY,
  RailwayMethods.Standard,
  {}
>;

export type ShipmentData =
  | RoadShipmentData
  | RailShipmentData
  | CourierShipmentData
