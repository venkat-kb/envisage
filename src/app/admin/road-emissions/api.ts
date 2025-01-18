"use server";

import { prisma } from "@/lib/db";
import { IRoadEmission } from "@/lib/validators/emission/road";

export const createRoadEmission = async (data: IRoadEmission) => {
  try {
    await prisma.roadVehicle.create({
      data,
    });
    return true;
  } catch {
    return false;
  }
};

export const updateRoadEmission = async (id: string, data: IRoadEmission) => {
  try {
    await prisma.roadVehicle.update({
      where: {
        id,
      },
      data,
    });
    return true;
  } catch {
    return false;
  }
};
