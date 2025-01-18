"use client";
import React from "react";
import { AlertCircle, CheckCircle2, WrenchIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { MagicCard } from "../ui/magic-card";
import { useTheme } from "next-themes";
import { LineShadowText } from "../ui/line-shadow-text";

const vehicles = [
  {
    id: "V001",
    status: "Active",
    driver: "Rajesh Kumar",
    lastLocation: "Delhi, India",
    efficiency: "High",
  },
  {
    id: "V002",
    status: "Inactive",
    driver: "Anita Singh",
    lastLocation: "Mumbai, India",
    efficiency: "Low",
  },
  {
    id: "V003",
    status: "Maintenance",
    driver: "Amit Sharma",
    lastLocation: "Bangalore, India",
    efficiency: "Medium",
  },
  {
    id: "V004",
    status: "Active",
    driver: "Priya Verma",
    lastLocation: "Chennai, India",
    efficiency: "High",
  },
  {
    id: "V005",
    status: "Inactive",
    driver: "Karan Patel",
    lastLocation: "Jaipur, India",
    efficiency: "Low",
  },
];

export function VehicleList() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="text-green-500" size={20} />;
      case "inactive":
        return <AlertCircle className="text-red-500" size={20} />;
      case "maintenance":
        return <WrenchIcon className="text-yellow-500" size={20} />;
      default:
        return null;
    }
  };
  const { theme } = useTheme();

  return (
    <MagicCard className="cursor-pointer flex-col whitespace-nowrap text-4xl shadow-2xl h-full flex-col" gradientColor={theme === "dark" ? "#212121" : "#BBBBBB80"}>
      <CardHeader>
        <CardTitle>
          <LineShadowText className="italic w-full" shadowColor={"black"}>Vehicle Status</LineShadowText>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Efficiency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      vehicle.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell>{vehicle.driver}</TableCell>
                <TableCell>{vehicle.lastLocation}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      vehicle.efficiency === "High" ? "default" : "secondary"
                    }
                  >
                    {vehicle.efficiency}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </MagicCard>
  );
}
