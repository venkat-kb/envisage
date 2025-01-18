"use client";
import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICheckpoint } from "@/lib/validators/tce/checkpoint-validator";
import { ITCE } from "@/lib/validators/tce/tce-validator";
import { ShipmentData } from "@/types/freight-data";
import { useState } from "react";
import { SaveChainShipment } from "./create-chain";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ClipboardCheckIcon, Save, Sheet } from "lucide-react";
import { Icons } from "@/components/ui/icons";

export type TCEData = {
  origin: string;
  destination: string;
  wtt: number;
  ttw: number;
  co2e: number;
  distance: number;
};
const TCEAssessCard: React.FC<{
  data: TCEData;
  hubs: ICheckpoint[];
  shipments: ShipmentData[];
  base: ITCE;
  onBack: () => void;
}> = ({ data, hubs, shipments, base, onBack }) => {
  const toast = useToast().toast;
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const onSave = () => {
    setLoading(true);
    SaveChainShipment(hubs, shipments, base)
      .then(() => {
        toast({
          title: "Saved",
          description: "Transport Chain Element saved successfully",
          variant: "default",
        });
        setSaved(true);
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to save Transport Chain Element",
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false));
  };
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5 w-full ">
          <CardTitle className="group flex items-center gap-2 text-lg w-full justify-between">
            Shipment
          </CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm min-w-[350px]">
        <div className="grid gap-3">
          <div className="font-semibold">Transit Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Origin</span>
              <span className="font-semibold max-w-[200px] truncate">
                {data.origin}
              </span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Destination</span>
              <span className="font-semibold  max-w-[200px] truncate">
                {data.destination}
              </span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-semibold">
                {data.distance.toFixed(0)} KM
              </span>
            </li>
          </ul>
          <Separator className="my-4" />
          <div className="font-semibold">Emission</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Well To Tank</span>
              <KgOrTonneCo2e val={data.wtt} />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tank to Wheel</span>
              <KgOrTonneCo2e val={data.ttw} />
            </li>

            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <KgOrTonneCo2e val={data.co2e} />
            </li>
          </ul>
        </div>
        <div className="mt-4 flex gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 mr-2" /> Back
          </Button>
          {!saved && (
            <Button onClick={onSave}>
              {loading ? (
                <Icons.spinner className="h-6 w-6 mr-2 animate-spin" />
              ) : (
                <ClipboardCheckIcon className="mr-2" size={20} />
              )}
              Save
            </Button>
          )}
        </div>
      </CardContent>
      {/* <Button
        type="submit"
        className="w-[100px] ml-4"
        disabled={loading}
        onClick={saved ? reset : onSave}
        // variant="link"
      >
        {saved ? (
          <>
            <Package className="h-4 w-4 mr-2" /> Reset
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" /> Save
          </>
        )}
      </Button> */}
    </Card>
  );
};

export default TCEAssessCard;
