import { FreightCategoryIcons } from "@/data/freight-categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Plus, Check } from "lucide-react";
import { Hubs } from "@/types/hub-location-types";
import { ShipmentDataTCE } from "../useTransportChain";
import { Fragment } from "react";
import { HubIconsMap } from "@/data/tce";

export const ViewTCECard: React.FC<{
  hubs: Hubs[];
  shipments: ShipmentDataTCE[];
}> = ({ hubs, shipments }) => (
  <Card className="max-h-[70vh] overflow-auto absolute right-4 top-24 z-[0] w-[30vw] max-w-[30vw]">
    <CardHeader className="pb-4">
      <CardTitle className="text-lg">Transportation Chain Elements</CardTitle>
    </CardHeader>
    <CardContent>
      {hubs.map((h, i) => {
        const Icon = HubIconsMap[h.type];
        const Icon2 =
          shipments.length > i
            ? FreightCategoryIcons[shipments[i].category]
            : undefined;
        return (
          <Fragment key={i}>
            <div className="flex gap-2 items-center p-2 bg-secondary text-muted-foreground rounded my-2">
              <p>{i + 1}.</p>
              <Icon size={16} />
              <p className="max-w-[150px] line-clamp-1">{h.name}</p>
            </div>
            {Icon2 && (
              <div className="flex gap-4">
                <ArrowDown className="text-muted-foreground" />
                <Icon2 />
              </div>
            )}
          </Fragment>
        );
      })}
    </CardContent>
  </Card>
);
