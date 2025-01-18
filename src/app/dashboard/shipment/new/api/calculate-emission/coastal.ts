import { BulkValidateShipmentData } from "@/app/dashboard/bulk-upload/new/page";
import {
  ICoastalValidator,
  IInternationalWaterValidator,
} from "@/lib/validators/shipment/coastal-validator";
import {
  CoastalShipmentData,
  InternationalWaterShipmentData,
} from "@/types/freight-data";
import { WaterEmission } from "@prisma/client";
import { getDBCoastalDistance } from "./db-distance";
import { FreightCategories, WaterMethods } from "@/types/freight-types";

export const calculateCoastalEmission = (
  data: ICoastalValidator,
  emissions: WaterEmission[],
  distance: number
) => {
  const emission = emissions.find(
    (emission) => emission.name === data.type && emission.size === data.size
  );
  if (!emission) {
    throw new Error("Emission data not found");
  }
  const ttw = emission.ttw * distance * data.load * data.count;
  const wtt = emission.wtt * distance * data.load * data.count;
  return {
    category: data.category,
    method: data.method,
    origin: data.origin,
    destination: data.destination,
    load: data.load,
    data: {
      type: data.type,
      size: data.size,
    },
    co2e: ttw + wtt,
    distance,
    ttw,
    wtt,
    count: data.count,
    from: data.date.from,
    to: data.date.to,
  } as CoastalShipmentData;
};

export const calculateInternationalWaterEmission = (
  data: IInternationalWaterValidator,
  emissions: WaterEmission[]
) => {
  const emission = emissions.find(
    (emission) => emission.name === data.type && emission.size === data.size
  );
  if (!emission) {
    throw new Error("Emission data not found");
  }
  const ttw = emission.ttw * data.distance * 1.852 * data.load * data.count;
  const wtt = emission.wtt * data.distance * 1.852 * data.load * data.count;
  return {
    category: data.category,
    method: data.method,
    origin: data.origin,
    destination: data.destination,
    load: data.load,
    data: {
      type: data.type,
      size: data.size,
    },
    co2e: ttw + wtt,
    distance: data.distance * 1.852,
    ttw,
    wtt,
    count: data.count,
    from: data.date.from,
    to: data.date.to,
  } as InternationalWaterShipmentData;
};

export const calculateBulkCoastalEmission = async (
  data: BulkValidateShipmentData,
  emissions: WaterEmission[]
) => {
  const distance = await getDBCoastalDistance(data.origin, data.destination);
  const calc = calculateCoastalEmission(
    {
      category: FreightCategories.WATERWAYS,
      method: WaterMethods.COASTAL,
      date: {
        from: data.from,
        to: data.to,
      },
      origin: data.origin,
      destination: data.destination,
      count: 1,
      load: data.load,
      // @ts-ignore
      size: data.data.size,
      // @ts-ignore
      type: data.data.type,
    },
    emissions,
    distance
  );
  return {
    ...calc,
    status: 1,
  } as BulkValidateShipmentData;
};

export const calculateBulkInternationalWaterEmission = async (
  data: BulkValidateShipmentData,
  emissions: WaterEmission[]
) => {
  const calc = calculateInternationalWaterEmission(
    {
      category: FreightCategories.WATERWAYS,
      method: WaterMethods.INTERNATIONAL_WATER,
      date: {
        from: data.from,
        to: data.to,
      },
      origin: data.origin,
      destination: data.destination,
      count: 1,
      load: data.load,
      // @ts-ignore
      size: data.data.size,
      // @ts-ignore
      type: data.data.type,
      // @ts-ignore
      distance: data.data.distance,
    },
    emissions
  );
  return {
    ...calc,
    status: 1,
  } as BulkValidateShipmentData;
};
