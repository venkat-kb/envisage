// @ts-nocheck
"use client";

import {
  ICourierValidator,
  courierValidator,
} from "@/lib/validators/shipment/road-validators";
import { FreightCategories, RoadMethods } from "@/types/freight-types";
import { Worksheet } from "exceljs";

export const courierParser = async (sheet: Worksheet) => {
  const data: ICourierValidator[] = [];
  sheet.eachRow((row, i) => {
    if (i === 1) return;
    console.log(row.cellCount);
    if (row.cellCount != 13) throw new Error("Invalid number of columns");

    const rowData: ICourierValidator = {
      category: FreightCategories.ROADWAYS,
      method: RoadMethods.COURIER,
      firstMileCapacity: "ANY",
      midMileCapacity: "ANY",
      lastMileCapacity: "ANY",
      date: {
        from: new Date(row.getCell(1).value?.toString()),
        to: new Date(row.getCell(2).value?.toString()),
      },
      origin: row.getCell(3).value?.toString(),
      firstMileVehicleType: row.getCell(4).value?.toString(),
      firstMileFuelType: row.getCell(5).value?.toString(),
      originHub: row.getCell(6).value?.toString(),
      midMileVehicleType: row.getCell(7).value?.toString(),
      midMileFuelType: row.getCell(8).value?.toString(),
      destinationHub: row.getCell(9).value?.toString(),
      lastMileVehicleType: row.getCell(10).value?.toString(),
      lastMileFuelType: row.getCell(11).value?.toString(),
      destination: row.getCell(12).value?.toString(),
      load: row.getCell(13).value?.toString(),
      count: 1,
      isRefrigerated: false,
    };

    const result = courierValidator.safeParse(rowData);
    if (result.success === false) {
      throw new Error(`Row ${i} ` + result.error.errors[0].message);
    }
    data.push(result.data);
  });
  return data;
};
