"use server";

import { prisma } from "@/lib/db";
import {
  AirShipmentData,
  RoadShipmentData,
  ShipmentData,
} from "@/types/freight-data";
import { cookies } from "next/headers";

export const createShipment = async (data: ShipmentData) => {
  const userId = cookies().get("userId")?.value!;
  return await prisma.shipment.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const updateShipment = async (data: ShipmentData) => {
  await prisma.shipment.update({
    where: {
      id: data.id,
    },
    data: data,
  });
};

export const deleteShipment = async (id: string) => {
  await prisma.shipment.delete({
    where: {
      id,
    },
  });
};
