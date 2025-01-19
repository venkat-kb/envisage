export enum FreightCategories {
  RAILWAY = "Rail",
  ROADWAYS = "Road",
}

export enum RoadMethods {
  PointToPoint = "Point To Point",
  COURIER = "Express Courier | Part Truck Load",
}

export enum RailwayMethods {
  Standard = "Standard",
}

export type FreightMethods =
  | RoadMethods
  | RailwayMethods;

export type FreightCategoryMethods = {
  [FreightCategories.RAILWAY]: RailwayMethods;
  [FreightCategories.ROADWAYS]: RoadMethods;
};
