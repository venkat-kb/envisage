"use server";

import { prisma } from "@/lib/db";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";

const calculateHaversineDistance = (
  origin: LatLngLiteral,
  destination: LatLngLiteral
) => {
  const dLat = ((destination.lat - origin.lat) * Math.PI) / 180.0;
  const dLon = ((destination.lng - origin.lng) * Math.PI) / 180.0;

  // convert to radians
  origin.lat = (origin.lat * Math.PI) / 180.0;
  destination.lat = (destination.lat * Math.PI) / 180.0;

  // apply formulae
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(origin.lat) *
      Math.cos(destination.lat);
  const rad = 6371;
  const c = 2 * Math.asin(Math.sqrt(a));
  return rad * c + 95;
};
export const getDBAirDistance = async (
  originIata: string,
  destinationIata: string
) => {
  const originAirport = await prisma.airport.findFirst({
    where: {
      iata: originIata,
    },
  });
  const destinationAirport = await prisma.airport.findFirst({
    where: {
      iata: destinationIata,
    },
  });
  if (!originAirport || !destinationAirport) {
    return 0;
  }
  const origin = {
    lat: originAirport.latitude,
    lng: originAirport.longitude,
  };
  const destination = {
    lat: destinationAirport.latitude,
    lng: destinationAirport.longitude,
  };
  return calculateHaversineDistance(origin, destination);
};

export const getDBCoastalDistance = async (
  origin: string,
  destination: string
) => {
  const data = await prisma.coastalDistances.findFirst({
    where: {
      origin,
      destination,
    },
  });
  if (!data) {
    return 0;
  }
  return data.distance;
};
