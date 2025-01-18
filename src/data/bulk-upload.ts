import {
  AirMethods,
  FreightCategories,
  FreightCategoryMethods,
  FreightMethods,
  RailwayMethods,
  RoadMethods,
  WaterMethods,
} from "@/types/freight-types";

export const FreightMethodsBulkUploadMap: Record<
  FreightCategories,
  {
    label: FreightMethods;
    sheet: string;
  }[]
> = {
  [FreightCategories.RAILWAY]: [
    {
      label: RailwayMethods.Standard,
      sheet: "Railway Bulk Reference.xlsx",
    },
  ],
  [FreightCategories.ROADWAYS]: [
    {
      label: RoadMethods.COURIER,

      sheet: "Courier Bulk Reference.xlsx",
    },
    {
      label: RoadMethods.PointToPoint,
      sheet: "Point To Point Bulk Reference.xlsx",
    },
  ],
  [FreightCategories.AIRWAYS]: [
    {
      label: AirMethods.DOMESTIC,
      sheet: "Air Bulk Reference.xlsx",
    },
    {
      label: AirMethods.INTERNATIONAL,
      sheet: "Air Bulk Reference.xlsx",
    },
  ],
  [FreightCategories.WATERWAYS]: [
    {
      label: WaterMethods.COASTAL,
      sheet: "Coastal Bulk Reference.xlsx",
    },
    {
      label: WaterMethods.INTERNATIONAL_WATER,
      sheet: "International Water Bulk Reference.xlsx",
    },
  ],
};
//   [FreightCategories.RAILWAY]: [
//     RailwayMethods.CONTAINERIZED,
//     RailwayMethods.NON_CONTAINERIZED,
//   ],
//   [FreightCategories.ROADWAYS]: [
//     RoadMethods.COURIER,
//     RoadMethods.INTERCITY,
//     RoadMethods.INTRACITY,
//     RoadMethods.REFRIGERATED,
//   ],
//   [FreightCategories.AIRWAYS]: [AirMethods.DOMESTIC, AirMethods.INTERNATIONAL],
//   [FreightCategories.WATERWAYS]: [
//     WaterMethods.COASTAL,
//     WaterMethods.INTERNATIONAL_WATER,
//   ],
