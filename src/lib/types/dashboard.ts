export interface VehicleData {
  id: string;
  vehicleNumber: string;
  lastLocation: string;
  status: "active" | "inactive" | "maintenance";
  fuelEfficiency: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface DistanceData {
  date: string;
  distance: number;
}

export interface OptimizationScore {
  vehicle: string;
  score: number;
}

export interface HotspotData {
  id: string;
  location: string;
  frequency: number;
  lastVisited: string;
}
