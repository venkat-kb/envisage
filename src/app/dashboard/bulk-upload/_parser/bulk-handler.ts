"use client";
import { Worksheet } from "exceljs";
// @ts-ignore
import * as ExcelJS from "exceljs/dist/exceljs.bare";
import { FREIGHT_PARSERS } from ".";
import { FreightMethods } from "@/types/freight-types";

// declare module 'exceljs/dist/exceljs.bare';

export const sheetValidator = async (file: File, method: FreightMethods) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  const sheet: Worksheet = workbook.worksheets[0];
  const parser = FREIGHT_PARSERS[method];
  console.log("SHEET: ", sheet.actualColumnCount, sheet.actualRowCount);

  if (sheet.actualRowCount < 2) throw new Error("No data found in file");
  if (sheet.actualRowCount > 100)
    throw new Error("Too many rows in file, please add less than 100 rows");
  return parser(sheet);
};
