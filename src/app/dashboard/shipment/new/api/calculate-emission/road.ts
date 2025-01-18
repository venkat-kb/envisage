import { RoadVehicleEmissionData } from "../../point-to-point/intercity-form";
import { CourierShipmentData, RoadShipmentData } from "@/types/freight-data";
import { calculateRoadDistance } from "../calculate-distance";
import { FreightCategories, RoadMethods } from "@/types/freight-types";
import { BulkValidateShipmentData } from "@/app/dashboard/bulk-upload/new/page";
import {
  ICourierValidator,
  IRoadValidator,
} from "@/lib/validators/shipment/road-validators";

export const calculateRoadEmission = (
  emissions: RoadVehicleEmissionData[],
  data: IRoadValidator,
  distance: number
) => {
  const emission = emissions.find(
    (emission) =>
      emission.fuel.toLowerCase() === data.fuel.toLowerCase() &&
      emission.type === data.vehicleType
  );
  if (!emission) throw new Error("Emission data not found");
  const wtt =
    emission.wtt * data.load * distance * (data.isRefrigerated ? 1.21 : 1);
  const ttw =
    emission.ttw * data.load * distance * (data.isRefrigerated ? 1.21 : 1);
  const co2e = wtt + ttw;
  const shipmentData: RoadShipmentData = {
    category: data.category,
    data: {
      fuel: data.fuel,
      vehicleType: data.vehicleType,
      isRefrigerated: data.isRefrigerated,
      capacity: data.capacity,
    },
    destination: data.destination,
    from: data.date.from,
    load: data.load,
    method: data.method,
    origin: data.origin,
    to: data.date.to,
    wtt,

    ttw,
    co2e,
    distance,
    count: 1,
  };

  return shipmentData;
};

export const calculateRoadEmissionTCE = (
  emissions: RoadVehicleEmissionData[],
  data: Omit<IRoadValidator, "date">,
  distance: number
) => {
  const emission = emissions.find(
    (emission) =>
      emission.fuel === data.fuel && emission.type === data.vehicleType
  );
  if (!emission) throw new Error("Emission data not found");
  const wtt = emission.wtt * data.load * distance * data.count;
  const ttw = emission.ttw * data.load * distance * data.count;
  const co2e = wtt + ttw;
  const shipmentData: Omit<RoadShipmentData, "from" | "to"> = {
    category: data.category,
    data: {
      fuel: data.fuel,
      vehicleType: data.vehicleType,
      capacity: emission.capacity,
      isRefrigerated: false,
    },
    destination: data.destination,
    load: data.load,
    method: data.method,
    origin: data.origin,
    wtt,
    ttw,
    co2e,
    distance,
    count: data.count,
  };

  return shipmentData;
};

export const calculateBulkRoad = async (
  emissions: RoadVehicleEmissionData[],
  data: RoadShipmentData
) => {
  const { origin, destination, from, to, category, method, load } =
    data as RoadShipmentData;
  const distance = await calculateRoadDistance(origin, destination);

  const calc = calculateRoadEmission(
    emissions,
    {
      category,
      method,
      origin,
      destination,
      date: { from, to },
      load,
      capacity: "",
      fuel: data.data.fuel,
      vehicleType: data.data.vehicleType,
      count: data.count,
      isRefrigerated: false,
    },
    distance
  );
  return {
    ...calc,
    status: 1,
  } as BulkValidateShipmentData;
};

export const FIRST_MILE_TTW = 0.224;
export const FIRST_MILE_WTT = 0.067;
const MID_MILE_TTW = 0.063;
const MID_MILE_WTT = 0.019;
const LAST_MILE_TTW = 0.224;
const LAST_MILE_WTT = 0.067;
const TRANS_SHIPMENT_TTW = 0.6;

export const calculateCourierEmission = (
  data: ICourierValidator,
  distances: [number, number, number],
  emission: RoadVehicleEmissionData[] = []
) => {
  const firstMileEmission =
    "firstMileVehicleType" in data &&
    emission.find(
      (e) =>
        e.type === data.firstMileVehicleType && e.fuel === data.firstMileFuel
    );
  const midMileEmission =
    "midMileVehicleType" in data &&
    emission.find(
      (e) => e.type === data.midMileVehicleType && e.fuel === data.midMileFuel
    );
  const lastMileEmission =
    "lastMileVehicleType" in data &&
    emission.find(
      (e) => e.type === data.lastMileVehicleType && e.fuel === data.lastMileFuel
    );

  const firstMileTTW =
    (firstMileEmission ? firstMileEmission.ttw : FIRST_MILE_TTW) *
    data.load *
    distances[0] *
    data.count *
    (data.isRefrigerated ? 1.21 : 1);
  const firstMileWTT =
    (firstMileEmission ? firstMileEmission.wtt : FIRST_MILE_WTT) *
    data.load *
    distances[0] *
    data.count *
    (data.isRefrigerated ? 1.21 : 1);
  const firstMileCo2e = firstMileTTW + firstMileWTT;

  const midMileTTW =
    (midMileEmission ? midMileEmission.ttw : MID_MILE_TTW) *
    data.load *
    distances[1] *
    data.count *
    (data.isRefrigerated ? 1.21 : 1);
  const midMileWTT =
    (midMileEmission ? midMileEmission.wtt : MID_MILE_WTT) *
    data.load *
    distances[1] *
    data.count *
    (data.isRefrigerated ? 1.21 : 1);
  const midMileCo2e = midMileTTW + midMileWTT;

  const lastMileTTW =
    (lastMileEmission ? lastMileEmission.ttw : LAST_MILE_TTW) *
    data.load *
    distances[2] *
    data.count *
    (data.isRefrigerated ? 1.21 : 1);
  const lastMileWTT =
    (lastMileEmission ? lastMileEmission.wtt : LAST_MILE_WTT) *
    data.load *
    distances[2] *
    data.count *
    (data.isRefrigerated ? 1.21 : 1);
  const lastMileCo2e = lastMileTTW + lastMileWTT;

  const transShipment = TRANS_SHIPMENT_TTW * data.load * 2 * data.count;
  const shipmentData: CourierShipmentData = {
    origin: data.origin,
    destination: data.destination,
    from: data.date.from,
    to: data.date.to,
    load: data.load,
    method: data.method,
    category: data.category,
    data: {
      originHub: data.originHub,
      destinationHub: data.destinationHub,
      firstMileCo2e,
      firstMileTTW,
      firstMileWTT,
      midMileCo2e,
      midMileTTW,
      midMileWTT,
      lastMileCo2e,
      lastMileTTW,
      lastMileWTT,
      transShipment,
    },
    co2e: firstMileCo2e + midMileCo2e + lastMileCo2e + transShipment,
    distance: distances.reduce((acc, curr) => acc + curr, 0),
    wtt: firstMileWTT + midMileWTT + lastMileWTT,
    ttw: firstMileTTW + midMileTTW + lastMileTTW,
    count: data.count,
  };
  return shipmentData;
};

export const calculateBulkCour = async (
  data: BulkValidateShipmentData,
  emission: RoadVehicleEmissionData[]
) => {
  const { origin, destination, from, to, category, method, load, count } = data;
  // @ts-ignore
  const { originHub, destinationHub } = data.data;

  const distanceOriginToOriginHub = await calculateRoadDistance(
    origin,
    originHub
  );
  const distanceOriginHubToDestinationHub = await calculateRoadDistance(
    originHub,
    destinationHub
  );
  const distanceDestinationHubToDestination = await calculateRoadDistance(
    destinationHub,
    destination
  );

  const calc = await calculateCourierEmission(
    {
      category: category as FreightCategories.ROADWAYS,
      method: method as RoadMethods.COURIER,
      origin,
      destination,
      originHub,
      destinationHub,
      count,
      date: { from, to },
      load,
      isRefrigerated: false,
    },
    [
      distanceOriginToOriginHub,
      distanceOriginHubToDestinationHub,
      distanceDestinationHubToDestination,
    ],
    emission
  );
  return {
    ...calc,
    status: 1,
  } as BulkValidateShipmentData;
};
