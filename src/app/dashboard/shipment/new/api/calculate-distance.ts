"use server";
import { prisma } from "@/lib/db";
import { LatLng, LatLngLiteral } from "@googlemaps/google-maps-services-js";
import axios from "axios";
import { LatLong } from "../domestic/page";
import { geoCodeLocation } from "./auto-complete";
import { INDIAN_AIRPORTS } from "@/data/indian-airports";
import { COASTAL_PORTS } from "@/data/coastal-ports";

export const calculateRoadDistance = async (
  origin: string,
  destination: string
) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  if (data.status !== "OK") {
    return 0;
  }

  return data.rows[0].elements[0].distance.value / 1000;
};

export const calculateAirDistance = async (
  origin: string,
  destination: string
) => {
  const originLoc = await geoCodeLocation(origin);

  const destinationLoc = await geoCodeLocation(destination);

  if (!originLoc || !destinationLoc) {
    return 0;
  }

  const dLat = ((destinationLoc.lat - originLoc.lat) * Math.PI) / 180.0;
  const dLon = ((destinationLoc.lng - originLoc.lng) * Math.PI) / 180.0;

  // convert to radians
  originLoc.lat = (originLoc.lat * Math.PI) / 180.0;
  destinationLoc.lat = (destinationLoc.lat * Math.PI) / 180.0;

  // apply formulae
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(originLoc.lat) *
      Math.cos(destinationLoc.lat);
  const rad = 6371;
  const c = 2 * Math.asin(Math.sqrt(a));
  return rad * c + 95;
};

export const calculateRailDistance = async (
  origin: string,
  destination: string
) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}&transit_mode=rail&mode=transit`
  );
  console.log(data.rows[0]);
  if (data.rows[0].elements[0].status === "ZERO_RESULTS") {
    return 0;
  }
  return data.rows[0].elements[0].distance.value / 1000;
};

export const getRoadEmissions = () => prisma.roadVehicle.findMany();
export const getWaterEmissions = () => prisma.waterEmission.findMany();

export const calculateCoastalDistance = async (
  origin: string,
  destination: string
) => {
  const data = await prisma.coastalDistances.findFirst({
    where: {
      origin,
      destination,
    },
  });

  return data ? data.distance : 0;
};

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

export const findClosestCoastalPort = (loation: { lat: number; lng: number }) =>
  findClosestCoordinate<(typeof COASTAL_PORTS)[number]>(loation, COASTAL_PORTS);

export const findClosestAirport = (location: { lat: number; lng: number }) =>
  findClosestCoordinate<(typeof INDIAN_AIRPORTS)[number]>(
    location,
    INDIAN_AIRPORTS
  );
