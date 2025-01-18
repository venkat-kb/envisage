"use client";

import {
  airValidator,
  IAirValidator,
} from "@/lib/validators/shipment/air-validator";
import {
  coastalValidator,
  ICoastalValidator,
  IInternationalWaterValidator,
  internationalWaterValidator,
} from "@/lib/validators/shipment/coastal-validator";
import {
  ICourierValidator,
  courierValidator,
} from "@/lib/validators/shipment/road-validators";
import {
  AirMethods,
  FreightCategories,
  RoadMethods,
  WaterMethods,
} from "@/types/freight-types";
import { Worksheet } from "exceljs";

export const coastalParser = async (sheet: Worksheet) => {
  const data: ICoastalValidator[] = [];
  sheet.eachRow((row, i) => {
    if (i === 1) return;
    console.log(row.cellCount);
    if (row.cellCount != 7) throw new Error("Invalid number of columns");

    const rowData: ICoastalValidator = {
      category: FreightCategories.WATERWAYS,
      method: WaterMethods.COASTAL,

      date: {
        from: new Date(row.getCell(1).value?.toString()!),
        to: new Date(row.getCell(2).value?.toString()!),
      },
      origin: row.getCell(3).value?.toString()!,
      destination: row.getCell(4).value?.toString()!,
      type: row.getCell(5).value?.toString()!,
      size: row.getCell(6).value?.toString()!,
      load: Number(row.getCell(7).value?.toString()),
      count: 1,
    };

    const result = coastalValidator.safeParse(rowData);
    if (result.success === false) {
      throw new Error(`Row ${i} ` + result.error.errors[0].message);
    }
    data.push(result.data);
  });
  return data;
};

export const internationalWaterParser = async (sheet: Worksheet) => {
  const data: IInternationalWaterValidator[] = [];
  sheet.eachRow((row, i) => {
    if (i === 1) return;
    console.log(row.cellCount);
    if (row.cellCount != 8) throw new Error("Invalid number of columns");

    const rowData: IInternationalWaterValidator = {
      category: FreightCategories.WATERWAYS,
      method: WaterMethods.INTERNATIONAL_WATER,
      date: {
        from: new Date(row.getCell(1).value?.toString()!),
        to: new Date(row.getCell(2).value?.toString()!),
      },
      origin: row.getCell(3).value?.toString()!,
      destination: row.getCell(4).value?.toString()!,
      type: row.getCell(5).value?.toString()!,
      size: row.getCell(6).value?.toString()!,
      load: Number(row.getCell(7).value?.toString()),
      distance: Number(row.getCell(8).value?.toString()),
      count: 1,
    };
    const result = internationalWaterValidator.safeParse(rowData);
    if (result.success === false) {
      throw new Error(`Row ${i} ` + result.error.errors[0].message);
    }
    data.push(result.data);
  });
  return data;
};
