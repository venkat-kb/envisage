import { FreightHubs } from "@/types/hub-location-types";
import { Icon } from "./sidenav-items";
import { Building2, TowerControl, TrainTrack, Waves } from "lucide-react";

export const HubIconsMap: Record<FreightHubs, Icon> = {
    Airport: TowerControl,
    "Coastal Port": Waves,
    "Land Hub": Building2,
    "Railway Station": TrainTrack,
  };