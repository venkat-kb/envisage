import { BulkValidateShipmentData } from "@/app/dashboard/bulk-upload/new/page";
import { prisma } from "@/lib/db";
import { IAirValidator } from "@/lib/validators/shipment/air-validator";
import { AirShipmentData, ShipmentData } from "@/types/freight-data";
import { AirMethods, FreightCategories } from "@/types/freight-types";
import { getDBAirDistance } from "./db-distance";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";

export const AIR_WTT_DOMESTIC = 0.2444;
export const AIR_TTW_DOMESTIC = 1.508;

export const AIR_WTT_INTERNATIONAL = 0.171;
export const AIR_TTW_INTERNATIONAL = 0.646;

export const calculateAirEmission = (
  data: IAirValidator,
  distance: number,
  method: AirMethods = AirMethods.DOMESTIC
) => {
  const wtt =
    (method === AirMethods.DOMESTIC
      ? AIR_WTT_DOMESTIC
      : AIR_WTT_INTERNATIONAL) *
    data.load *
    distance *
    data.count;
  const ttw =
    (method === AirMethods.DOMESTIC
      ? AIR_TTW_DOMESTIC
      : AIR_TTW_INTERNATIONAL) *
    data.load *
    distance *
    data.count;

  const co2e = wtt + ttw;
  const shipmentData: AirShipmentData = {
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

export const calculateAirEmissionTCE = (
  data: Omit<IAirValidator, "date" | "category" | "method">,
  distance: number
) => {
  const wtt = AIR_WTT_DOMESTIC * data.load * distance * data.count;
  const ttw = AIR_TTW_DOMESTIC * data.load * distance * data.count;
  const co2e = wtt + ttw;
  const shipmentData: Omit<AirShipmentData, "from" | "to"> = {
    category: FreightCategories.AIRWAYS,
    method: AirMethods.DOMESTIC,
    origin: data.origin,
    destination: data.destination,

    load: data.load,
    distance,
    wtt,
    ttw,
    data: {},
    count: data.count,
    co2e,
  };
  return shipmentData;
};

export const calculateBulkAirEmission = async (
  data: BulkValidateShipmentData,
  method: AirMethods
) => {
  const origin = data.origin;
  const destination = data.destination;
  const distance = await getDBAirDistance(
    origin.split(" ")[0],
    destination.split(" ")[0]
  );
  const calc = calculateAirEmission(
    {
      origin,
      destination,
      date: {
        from: data.from,
        to: data.to,
      },
      category: FreightCategories.AIRWAYS,
      method,
      count: 1,
      load: data.load,
    },
    distance,
    method
  );
  return {
    ...calc,
    status: 1,
  } as BulkValidateShipmentData;
};
