import { BulkValidateShipmentData } from "@/app/dashboard/bulk-upload/new/page";
import { IRailValidator } from "@/lib/validators/shipment/rail-validator";
import { RailShipmentData } from "@/types/freight-data";
import { FreightCategories, RailwayMethods } from "@/types/freight-types";
import { calculateRailDistance } from "../calculate-distance";

export const RAIL_TTW = 0.0041;
export const RAIL_WTT = 0.0062;

export const calculateRailEmission = (
  data: IRailValidator,
  distance: number
) => {
  const wtt = RAIL_WTT * data.load * distance * data.count;
  const ttw = RAIL_TTW * data.load * distance * data.count;
  const co2e = wtt + ttw;
  const shipmentData: RailShipmentData = {
    category: data.category,
    method: data.method,
    origin: data.origin,
    destination: data.destination,
    from: data.date.from,
    to: data.date.to,
    load: data.load,
    distance,
    wtt,
    ttw,
    data: {},
    co2e,
    count: data.count,
  };
  return shipmentData;
};

export const calculateRailEmissionTCE = (
  data: Omit<IRailValidator, "date" | "method" | "category">,
  distance: number
) => {
  const wtt = RAIL_WTT * data.load * distance * data.count;
  const ttw = RAIL_TTW * data.load * distance * data.count;
  const co2e = wtt + ttw;
  const shipmentData: Omit<RailShipmentData, "from" | "to"> = {
    category: FreightCategories.RAILWAY,
    method: RailwayMethods.Standard,
    origin: data.origin,
    destination: data.destination,
    load: data.load,
    distance,
    wtt,
    ttw,
    data: {},
    co2e,
    count: data.count,
  };
  return shipmentData;
};

export const calculateBulkRail = async (data: BulkValidateShipmentData) => {
  const distance = await calculateRailDistance(data.origin, data.destination);
  const calc = calculateRailEmission(
    {
      category: FreightCategories.RAILWAY,
      method: RailwayMethods.Standard,
      origin: data.origin,
      destination: data.destination,
      count: 1,
      load: data.load,
      date: {
        from: data.from,
        to: data.to,
      },
    },
    distance
  );
  return {
    ...calc,
    status: 1,
  } as BulkValidateShipmentData;
};
