"use client";
import { ReactFlowProvider } from "reactflow";
import TCEFlow from "../flow";
import { Hubs } from "@/types/hub-location-types";
import { ShipmentDataTCE } from "../useTransportChain";

export const ViewTCEFlow: React.FC<{
  hubs: Hubs[];
  shipments: ShipmentDataTCE[];
}> = ({ hubs, shipments }) => (
  <ReactFlowProvider>
    <TCEFlow hubs={hubs} shipments={shipments} />
  </ReactFlowProvider>
);
