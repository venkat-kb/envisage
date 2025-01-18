import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { CourierShipmentData, RoadShipmentData } from "@/types/freight-data";

import { Package, Save } from "lucide-react";
import { useState } from "react";
import { createShipment, updateShipment } from "../api/create-shipment";
import { useToast } from "@/components/ui/use-toast";
import { CreationState } from "@/types/shipment-creation-types";

const CourierAssessCard: React.FC<{
  data: CourierShipmentData;
  reset: () => void;
  state: CreationState;
}> = ({ data, reset, state }) => {
  const [loading, setLoading] = useState(false);
  const { toast, dismiss } = useToast();
  const [saved, setSaved] = useState(false);
  const onSave = async () => {
    try {
      setLoading(true);
      if (state.state === "editing") {
        await updateShipment({ ...data, id: state.id });
        toast({
          title: "Shipment Updated",
          description: "Your shipment has been updated successfully",
        });
      } else {
        await createShipment(data);
        toast({
          title: "Shipment Saved",
          description: "Your shipment has been saved successfully",
        });
      }
      setSaved(true);
    } catch (e) {
      toast({
        title: "Whoops!",
        description: "Failed to save shipment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Transit Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Origin</span>
              <span className="font-semibold">{data.origin}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Origin Hub</span>
              <span className="font-semibold">{data.data.originHub}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Destination Hub</span>
              <span className="font-semibold">{data.data.destinationHub}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Destination</span>
              <span className="font-semibold">{data.destination}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-semibold">
                {data.distance.toFixed(0)} KM
              </span>
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Emissions</div>
          <ul className="grid gap-3">
            <li className="flex justify-between gap-2">
              <span className="text-muted-foreground">First Mile</span>
              <KgOrTonneCo2e val={data.data.firstMileCo2e} />
            </li>
            <li className="flex justify-between gap-2">
              <span className="text-muted-foreground">Mid Mile</span>
              <KgOrTonneCo2e val={data.data.midMileCo2e} />
            </li>

            <li className="flex justify-between gap-2">
              <span className="text-muted-foreground">Last Mile</span>
              <KgOrTonneCo2e val={data.data.lastMileCo2e} />
            </li>
          </ul>
          <Separator className="my-4" />
          <div className="font-semibold">Total Emissions</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Well To Tank</span>
              <KgOrTonneCo2e val={data.wtt} />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tank to Wheel</span>
              <KgOrTonneCo2e val={data.ttw} />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Trans-Shipment</span>
              <KgOrTonneCo2e val={data.data.transShipment} />
            </li>

            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total Emission</span>
              <KgOrTonneCo2e val={data.co2e} />
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Emission Intensity</span>
              <KgOrTonneCo2e isIntensity val={data.co2e / data.load} />
            </li>
          </ul>
        </div>
      </CardContent>
      <Button
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
      </Button>
      <CardFooter />
    </Card>
  );
};

export default CourierAssessCard;
