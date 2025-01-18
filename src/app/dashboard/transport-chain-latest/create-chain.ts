// @ts-nocheck
"use server";
import { prisma } from "@/lib/db";
import { ICoastalValidator } from "@/lib/validators/shipment/coastal-validator";
import { IRailValidator } from "@/lib/validators/shipment/rail-validator";
import { IRoadValidator } from "@/lib/validators/shipment/road-validators";
import { ICheckpoint } from "@/lib/validators/tce/checkpoint-validator";
import { ITCE } from "@/lib/validators/tce/tce-validator";
import { ShipmentData } from "@/types/freight-data";
import {
  AirMethods,
  FreightCategories,
  RailwayMethods,
  RoadMethods,
  WaterMethods,
} from "@/types/freight-types";
import { cookies } from "next/headers";

export type IShipmentValidator =
  | IRoadValidator
  | IRailValidator
  | ICoastalValidator;

const getMethodByCategory = (category: FreightCategories) => {
  switch (category) {
    case FreightCategories.AIRWAYS:
      return AirMethods.DOMESTIC;
    case FreightCategories.ROADWAYS:
      return RoadMethods.PointToPoint;
    case FreightCategories.RAILWAY:
      return RailwayMethods.Standard;
    case FreightCategories.WATERWAYS:
      return WaterMethods.COASTAL;
  }
};

export const CreateChainShipments = (
  shipment: ITCE,
  checkpoints: ICheckpoint[]
) => {
  const shipments: IShipmentValidator[] = [];
  const newCheckpoints = [
    ...checkpoints,
    {
      location: shipment.destination,
      category: shipment.category,
      capacity: "ANY",
      vehicleType: shipment.vehicleType,
      fuel: shipment.fuel,
      type: shipment.type,
      size: shipment.size,
    },
  ];

  for (let i = 0; i < newCheckpoints.length; i++) {
    const checkpoint = { ...newCheckpoints[i] };
    const shipmentData: IShipmentValidator = {
      origin: i === 0 ? shipment.origin : checkpoints[i - 1].location,
      destination: checkpoint.location,
      category: checkpoint.category,
      method: getMethodByCategory(checkpoint.category),
      date: shipment.date,
      count: 1,
      load: shipment.load,
    };

    switch (shipmentData.category) {
      case FreightCategories.RAILWAY:
        break;
      case FreightCategories.AIRWAYS:
        break;
      case FreightCategories.ROADWAYS:
        shipmentData.vehicleType = checkpoint.vehicleType;
        shipmentData.capacity = "ANY";
        shipmentData.fuel = checkpoint.fuel;
        break;

      case FreightCategories.WATERWAYS:
        shipmentData.type = checkpoint.type;
        shipmentData.size = checkpoint.size;
        break;
    }
    shipments.push(shipmentData as IShipmentValidator);
  }
  return {
    shipments,
    checkpoints: [
      { location: shipment.origin, category: shipment.category },
      ...newCheckpoints,
    ] as ICheckpoint[],
  };
};

export const SaveChainShipment = async (
  checkpoints: ICheckpoint[],
  shipments: ShipmentData[],
  base: ITCE
) => {
  const cookie = cookies();
  await prisma.tSE.create({
    data: {
      from: base.date.from,
      to: base.date.to,
      destination: base.destination,
      origin: base.origin,
      hubs: checkpoints,
      load: base.load,
      shipment: shipments,
      createdOn: new Date(),
      createdAt: new Date(),
      userId: cookie.get("userId")?.value!,
    },
  });
};
