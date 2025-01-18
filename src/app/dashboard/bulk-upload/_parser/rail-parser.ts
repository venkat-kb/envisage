"use client";

import {
  airValidator,
  IAirValidator,
} from "@/lib/validators/shipment/air-validator";
import {
  IRailValidator,
  railValidator,
} from "@/lib/validators/shipment/rail-validator";
import {
  ICourierValidator,
  courierValidator,
} from "@/lib/validators/shipment/road-validators";
import {
  AirMethods,
  FreightCategories,
  RailwayMethods,
  RoadMethods,
} from "@/types/freight-types";
import { Worksheet } from "exceljs";

export const railParser = async (sheet: Worksheet) => {
  const data: IRailValidator[] = [];
  sheet.eachRow((row, i) => {
    if (i === 1) return;
    console.log(row.cellCount);
    if (row.cellCount != 5) throw new Error("Invalid number of columns");

    const rowData: IRailValidator = {
      category: FreightCategories.RAILWAY,
      method: RailwayMethods.Standard,

      date: {
        from: new Date(row.getCell(1).value?.toString()!),
        to: new Date(row.getCell(2).value?.toString()!),
      },
      origin: row.getCell(3).value?.toString()!,
      destination: row.getCell(4).value?.toString()!,
      load: Number(row.getCell(5).value?.toString()),
      count: 1,
    };

    const result = railValidator.safeParse(rowData);
    if (result.success === false) {
      throw new Error(`Row ${i} ` + result.error.errors[0].message);
    }
    data.push(result.data);
  });
  return data;
};
