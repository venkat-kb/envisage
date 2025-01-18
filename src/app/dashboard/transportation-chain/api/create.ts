"use server";

import { prisma } from "@/lib/db";
import { ShipmentData } from "@/types/freight-data";
import { Hubs } from "@/types/hub-location-types";
import { Shipment } from "@prisma/client";
import { cookies } from "next/headers";

export type TSEShipment = {
  hubs: Hubs[];
  shipment: ShipmentData[];
  load: number;
  origin: string;
  destination: string;
  from: Date;
  to: Date;
};
export const createTSEShipment = async (data: TSEShipment) => {
  const userId = cookies().get("userId");
  return await prisma.tSE.create({
    data: { ...data, userId: userId!.value },
  });
};

export const createShipments = async (data: ShipmentData[]) => {
  const userId = cookies().get("userId");
  return await prisma.shipment.createMany({
    data: data.map((i) => ({ ...i, userId: userId!.value })),
  });
};
