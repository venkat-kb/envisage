export enum FreightCategories {
  RAILWAY = "Rail",
  ROADWAYS = "Road",
  AIRWAYS = "Air",
  WATERWAYS = "Water",
}

export enum RoadMethods {
  PointToPoint = "Point To Point",
  COURIER = "Express Courier | Part Truck Load",
}

export enum AirMethods {
  DOMESTIC = "Domestic",
  INTERNATIONAL = "International",
}

export enum WaterMethods {
  COASTAL = "Coastal",
  INTERNATIONAL_WATER = "International Waters",
}

export enum RailwayMethods {
  Standard = "Standard",
}

export type FreightMethods =
  | RoadMethods
  | AirMethods
  | WaterMethods
  | RailwayMethods;

export type FreightCategoryMethods = {
  [FreightCategories.RAILWAY]: RailwayMethods;
  [FreightCategories.ROADWAYS]: RoadMethods;
  [FreightCategories.AIRWAYS]: AirMethods;
  [FreightCategories.WATERWAYS]: WaterMethods;
};
