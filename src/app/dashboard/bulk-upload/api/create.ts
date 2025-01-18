"use server";

import { prisma } from "@/lib/db";
import { ShipmentData } from "@/types/freight-data";
import { BulkShipment } from "@prisma/client";
import { cookies } from "next/headers";

export const createBulk = async (ref: string, data: ShipmentData[]) => {
  const userId = cookies().get("userId")?.value!;
  const bulk = await prisma.bulkShipment.create({
    data: {
      referenceID: ref,
      userId,
    },
  });
  const bulkData = await prisma.shipment.createMany({
    data: data.map((shipment) => ({
      ...shipment,
      bulkRef: bulk.id,
      userId,
    })),
  });
  return {
    bulk,
    bulkData,
  };
};
