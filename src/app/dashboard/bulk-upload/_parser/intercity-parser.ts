// @ts-nocheck
"use client";
import {
  IRoadValidator,
  roadValidator,
} from "@/lib/validators/shipment/road-validators";
import { FreightCategories, RoadMethods } from "@/types/freight-types";
import { Worksheet } from "exceljs";

export const IntercityParser = async (sheet: Worksheet) => {
  const data: IRoadValidator[] = [];
  sheet.eachRow((row, i) => {
    if (i === 1) return;
    if (row.cellCount != 7) throw new Error("Invalid number of columns");
    const rowData: IRoadValidator = {
      date: {
        from: new Date(row.getCell(1).value?.toString()),
        to: new Date(row.getCell(2).value?.toString()),
      },
      category: FreightCategories.ROADWAYS,
      method: RoadMethods.PointToPoint,
      origin: row.getCell(3).value?.toString(),
      destination: row.getCell(4).value?.toString(),
      vehicleType: row.getCell(5).value?.toString(),
      fuel: row.getCell(6).value?.toString(),
      load: row.getCell(7).value?.toString(),
      count: 1,
      capacity: "0 MT",
      isRefrigerated: false,
    };
    const result = roadValidator.safeParse(rowData);

    if (result.success === false) {
      throw new Error(`Row ${i} ` + result.error.errors[0].message);
    }
    data.push(result.data);
  });
  return data;
};
