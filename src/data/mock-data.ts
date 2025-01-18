import {
  DistanceData,
  OptimizationScore,
  HotspotData,
  VehicleData,
} from "@/lib/types/dashboard";

export const distanceData: DistanceData[] = [
  { date: "2024-03-01", distance: 450 },
  { date: "2024-03-02", distance: 380 },
  { date: "2024-03-03", distance: 520 },
  { date: "2024-03-04", distance: 490 },
  { date: "2024-03-05", distance: 600 },
  { date: "2024-03-06", distance: 530 },
  { date: "2024-03-07", distance: 450 },
];

export const optimizationScores: OptimizationScore[] = [
  { vehicle: "TN01AB1234", score: 85 },
  { vehicle: "TN01AB1235", score: 92 },
  { vehicle: "TN01AB1236", score: 78 },
  { vehicle: "TN01AB1237", score: 88 },
  { vehicle: "TN01AB1238", score: 95 },
];

export const hotspotData: HotspotData[] = [
  {
    id: "1",
    location: "Chennai Central",
    frequency: 45,
    lastVisited: "2024-03-07",
  },
  {
    id: "2",
    location: "Madurai Junction",
    frequency: 38,
    lastVisited: "2024-03-06",
  },
  {
    id: "3",
    location: "Coimbatore Hub",
    frequency: 32,
    lastVisited: "2024-03-07",
  },
  {
    id: "4",
    location: "Salem Depot",
    frequency: 28,
    lastVisited: "2024-03-05",
  },
  {
    id: "5",
    location: "Trichy Terminal",
    frequency: 25,
    lastVisited: "2024-03-07",
  },
];

export const vehicleData: VehicleData[] = [
  {
    id: "1",
    vehicleNumber: "TN01AB1234",
    lastLocation: "Chennai Central",
    status: "active",
    fuelEfficiency: 8.5,
    lastMaintenance: "2024-02-15",
    nextMaintenance: "2024-03-15",
  },
  {
    id: "2",
    vehicleNumber: "TN01AB1235",
    lastLocation: "Madurai Junction",
    status: "maintenance",
    fuelEfficiency: 7.8,
    lastMaintenance: "2024-03-01",
    nextMaintenance: "2024-04-01",
  },
  {
    id: "3",
    vehicleNumber: "TN01AB1236",
    lastLocation: "Coimbatore Hub",
    status: "active",
    fuelEfficiency: 9.2,
    lastMaintenance: "2024-02-20",
    nextMaintenance: "2024-03-20",
  },
  {
    id: "4",
    vehicleNumber: "TN01AB1237",
    lastLocation: "Salem Depot",
    status: "inactive",
    fuelEfficiency: 8.1,
    lastMaintenance: "2024-02-10",
    nextMaintenance: "2024-03-10",
  },
];
