"use client";
import LabelledFormInput from "@/components/form/labelled-form-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IRoadValidator,
  roadValidator,
} from "@/lib/validators/shipment/road-validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FreightCategories, RoadMethods } from "@/types/freight-types";
import { Form } from "@/components/ui/form";
import DatePickerFormInput from "@/components/form/date-picker-form-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RoadSearchFormInput from "@/components/form/road-search-input";
import RoadVehicleSelectFormInput from "@/components/form/road-vehicle-select-form-input";
import { Package, Save } from "lucide-react";
import AssessCard from "./assess-card";
import { Icons } from "@/components/ui/icons";
import { calculateRoadDistance } from "../api/calculate-distance";
import { RoadShipmentData } from "@/types/freight-data";
import { calculateRoadEmission } from "../api/calculate-emission/road";
import { useToast } from "@/components/ui/use-toast";
import { createShipment } from "../api/create-shipment";
import LabelledLoadInput from "@/components/form/labelled-load-input";
import SwitchFormInput from "@/components/form/switch-form-input";
import {
  CreationState,
  shipmentCreateLabel,
} from "@/types/shipment-creation-types";
import { useRouter } from "next/navigation";

export type RoadVehicleEmissionData = {
  id: string;
  type: string;
  ttw: number;
  wtt: number;
  fuel: string;
  capacity: string;
};
const IntercityForm: React.FC<{
  data: RoadVehicleEmissionData[];
  defaultData?: IRoadValidator;
  state: CreationState;
}> = ({ data, state, defaultData }) => {
  const form = useForm<IRoadValidator>({
    resolver: zodResolver(roadValidator),
    defaultValues: defaultData || {
      method: RoadMethods.PointToPoint,
      category: FreightCategories.ROADWAYS,
      count: 1,
      isRefrigerated: false,
    },
  });
  const [emissionData, setEmissionData] = useState<RoadShipmentData>();
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = form.watch("date");
  const vehicleType = form.watch(["vehicleType", "fuel"]);

  const router = useRouter();
  const reset = () => {
    form.reset();
    setShow(false);
    setEmissionData(undefined);
    if (state.state === "editing") router.push("/dashboard/shipment/new/");
  };
  const onSubmit = async (formData: IRoadValidator) => {
    try {
      setLoading(true);
      const distance = await calculateRoadDistance(
        formData.origin,
        formData.destination
      );
      const shipmentData = calculateRoadEmission(data, formData, distance);
      setEmissionData(shipmentData);
      setLoading(false);
      setShow(true);
    } catch (error) {
      toast({
        title: "Whoops!",
        variant: "destructive",
        description: "Failed to calculate emission. Please try again.",
      });
    }
  };

  return (
    <div className="flex gap-2 justify-center transition-all">
      <Card
        className={`max-w-max transition-all duration-300 ease-in-out transform ${
          show ? "translate-x-[-5rem]" : ""
        }`}
      >
        <CardHeader className="py-4 bg-muted">
          <CardTitle className="text-lg ">
            <span className="text-sm text-muted-foreground font-normal leading-3">
              {shipmentCreateLabel(state)}
            </span>
            <br />
            Road - Point To Point
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <DatePickerFormInput
                control={form.control}
                label="Shipment Date Range"
                name="date"
                date={date}
              />
              <RoadSearchFormInput
                control={form.control}
                label="Origin"
                name="origin"
                placeholder="Origin Location"
              />
              <RoadSearchFormInput
                control={form.control}
                label="Destination"
                name="destination"
                placeholder="Destination Location"
              />
              <RoadVehicleSelectFormInput
                data={data}
                vehicleType={vehicleType}
                setValue={form.setValue}
                control={form.control}
                label="Vehicle"
                name="vehicleType"
              />
              <LabelledLoadInput
                label="Load in MT"
                control={form.control}
                name="load"
                placeholder="0.00"
                type="number"
              />
              <SwitchFormInput
                control={form.control}
                name="isRefrigerated"
                label="Refrigerated Shipment"
              />

              <Button className="w-[100px]" disabled={loading}>
                {loading ? (
                  <Icons.spinner className="animate-spin h-4 w-4" />
                ) : (
                  <>
                    <Package className="h-4 w-4 mr-2" /> Assess
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {show && <AssessCard data={emissionData!} reset={reset} state={state} />}
    </div>
  );
};

export default IntercityForm;
