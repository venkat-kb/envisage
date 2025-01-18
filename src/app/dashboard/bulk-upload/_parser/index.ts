import {
  AirMethods,
  FreightMethods,
  RailwayMethods,
  RoadMethods,
  WaterMethods,
} from "@/types/freight-types";
import { courierParser } from "./courier-parser";
import { Worksheet } from "exceljs";
import { IntercityParser } from "./intercity-parser";
import { airParser } from "./air-parser";
import { coastalParser, internationalWaterParser } from "./water-parser";
import { railParser } from "./rail-parser";

export const NOT_IMPLEMENTED = (x: Worksheet) => {
  throw new Error("NOT IMPLEMENTED");
};

export const FREIGHT_PARSERS: Record<FreightMethods, (x: Worksheet) => any> = {
  [RoadMethods.COURIER]: courierParser,
  [RoadMethods.PointToPoint]: IntercityParser,
  [RailwayMethods.Standard]: railParser,
  [AirMethods.DOMESTIC]: airParser,
  [AirMethods.INTERNATIONAL]: airParser,
  [WaterMethods.COASTAL]: coastalParser,
  [WaterMethods.INTERNATIONAL_WATER]: internationalWaterParser,
};
