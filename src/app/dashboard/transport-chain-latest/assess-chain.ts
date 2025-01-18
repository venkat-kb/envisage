// @ts-nocheck
import { IShipmentValidator } from "./create-chain";
import {
  AirMethods,
  FreightCategories,
  RoadMethods,
} from "@/types/freight-types";
import {
  AIR_TTW_DOMESTIC,
  AIR_WTT_DOMESTIC,
  calculateAirEmission,
} from "../shipment/new/api/calculate-emission/air";
import {
  calculateRoadEmission,
  FIRST_MILE_TTW,
  FIRST_MILE_WTT,
} from "../shipment/new/api/calculate-emission/road";
import { calculateRailEmission } from "../shipment/new/api/calculate-emission/rail";
import { calculateCoastalEmission } from "../shipment/new/api/calculate-emission/coastal";
import {
  AirShipmentData,
  RoadShipmentData,
  ShipmentData,
} from "@/types/freight-data";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";
import axios from "axios";
import { INDIAN_AIRPORTS } from "@/data/indian-airports";
import {
  calculateAirDistance,
  calculateCoastalDistance,
  calculateRailDistance,
  calculateRoadDistance,
  findClosestCoastalPort,
} from "../shipment/new/api/calculate-distance";
import { RoadVehicleEmissionData } from "../shipment/new/point-to-point/intercity-form";
import { WaterEmission } from "@prisma/client";
import { geoCodeLocation } from "../shipment/new/api/auto-complete";

function haversineDistance(
  location: { lat: number; lng: number },
  destination: { lat: number; lng: number }
) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = degreesToRadians(destination.lat - location.lat);
  const dLon = degreesToRadians(destination.lng - location.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(location.lat)) *
      Math.cos(degreesToRadians(destination.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

function findClosestCoordinate<T extends { lat: number; lng: number }>(
  location: { lat: number; lng: number },
  coordinates: readonly T[]
) {
  let closestCoordinate: T = coordinates[0];
  let smallestDistance = Infinity;

  coordinates.forEach((coord) => {
    const distance = haversineDistance(location, coord);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestCoordinate = coord;
    }
  });

  return closestCoordinate;
}

const findClosestAirport = (location: { lat: number; lng: number }) =>
  findClosestCoordinate<(typeof INDIAN_AIRPORTS)[number]>(
    location,
    INDIAN_AIRPORTS
  );

export const AssessChainShipment = async (
  data: IShipmentValidator[],
  roadEmissions: RoadVehicleEmissionData[],
  waterEmissions: WaterEmission[]
) => {
  const shipments: ShipmentData[] = [];
  for (const item of data)
    switch (item.category) {
      case FreightCategories.AIRWAYS:
        console.log(item);
        const originGeocode = await geoCodeLocation(item.origin);
        const destinationGeocode = await geoCodeLocation(item.destination);
        const originAirport: any = await findClosestAirport(originGeocode);
        const destinationAirport: any = await findClosestAirport(
          destinationGeocode
        );
        const airDistance = await calculateAirDistance(
          originAirport.name,
          destinationAirport.name
        );
        const roadDistance = await calculateRoadDistance(
          item.origin,
          originAirport.name
        );
        // if (roadDistance > 5) {
        //   const wtt = roadDistance * FIRST_MILE_WTT * item.load;
        //   const ttw = roadDistance * FIRST_MILE_TTW * item.load;
        //   console.log(
        //     wtt,
        //     ttw,
        //     data.load,
        //     roadDistance,
        //     FIRST_MILE_TTW,
        //     FIRST_MILE_WTT
        //   );
        //   const firstMileShipment: RoadShipmentData = {
        //     origin: item.origin,
        //     destination: originAirport.name,
        //     distance: roadDistance,
        //     wtt,
        //     ttw,
        //     co2e: wtt + ttw,
        //     category: FreightCategories.ROADWAYS,
        //     count: 1,
        //     data: {
        //       capacity: "ANY",
        //       fuel: "Diesel",
        //       isRefrigerated: false,
        //       vehicleType: "ANY",
        //     },
        //     from: item.date.from,
        //     to: item.date.to,
        //     load: item.load,
        //     method: RoadMethods.PointToPoint,
        //   };
        //   shipments.push(firstMileShipment);
        // }
        const midMileTTW = airDistance * AIR_TTW_DOMESTIC;
        const midMileWTT = airDistance * AIR_WTT_DOMESTIC;
        const shipment: AirShipmentData = {
          origin: originAirport.name,
          destination: destinationAirport.name,
          distance: airDistance,
          wtt: midMileWTT,
          ttw: midMileTTW,
          co2e: midMileTTW + midMileWTT,
          count: 1,
          from: item.date.from,
          to: item.date.to,
          load: item.load,
          category: item.category as FreightCategories.AIRWAYS,
          data: {},
          method: item.method as unknown as AirMethods.DOMESTIC,
        };
        shipments.push(shipment);
        break;
      case FreightCategories.ROADWAYS:
        const distanceRoad = await calculateRoadDistance(
          item.origin,
          item.destination
        );
        const data = await calculateRoadEmission(
          roadEmissions,
          item,
          distanceRoad
        );
        shipments.push(data);
        break;
      case FreightCategories.RAILWAY:
        const distanceRail = await calculateRailDistance(
          item.origin,
          item.destination
        );
        const shipmentRail = await calculateRailEmission(item, distanceRail);
        shipments.push(shipmentRail);
        break;
      case FreightCategories.WATERWAYS:
        const originCoastalGeocode = await geoCodeLocation(item.origin);
        const destinationCoastalGeocode = await geoCodeLocation(
          item.destination
        );

        const originPort = await findClosestCoastalPort(originCoastalGeocode);
        const destinationPort = await findClosestCoastalPort(
          destinationCoastalGeocode
        );
        const roadDistancee = await calculateRoadDistance(
          item.origin,
          originPort.origin
        );
        // if (roadDistance > 5) {
        //   const wtt = roadDistance * FIRST_MILE_WTT * data.load;
        //   const ttw = roadDistance * FIRST_MILE_TTW * data.load;
        //   const firstMileShipment: RoadShipmentData = {
        //     origin: item.origin,
        //     destination: originPort.origin,
        //     distance: roadDistance,
        //     wtt,
        //     ttw,
        //     co2e: wtt + ttw,
        //     category: FreightCategories.ROADWAYS,
        //     count: 1,
        //     data: {
        //       capacity: "ANY",
        //       fuel: "Diesel",
        //       isRefrigerated: false,
        //       vehicleType: "ANY",
        //     },
        //     from: item.date.from,
        //     to: item.date.to,
        //     load: item.load,
        //     method: RoadMethods.PointToPoint,
        //   };
        //   shipments.push(firstMileShipment);
        // }
        const distance = await calculateCoastalDistance(
          originPort.origin,
          destinationPort.origin
        );
        item.origin = originPort.origin;
        item.destination = destinationPort.origin;
        const shipmentCoastal = calculateCoastalEmission(
          item,
          waterEmissions,
          distance
        );
        shipments.push(shipmentCoastal);
        break;
    }
  console.log(shipments);
  return shipments;
};
