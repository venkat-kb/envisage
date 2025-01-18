"use client";
import AirportSearchFormInput from "@/components/form/airport-search-input";
import DatePickerFormInput from "@/components/form/date-picker-form-input";
import LabelledFormInput from "@/components/form/labelled-form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import {
  IAirValidator,
  airValidator,
} from "@/lib/validators/shipment/air-validator";
import { AirShipmentData, BaseShipmentData } from "@/types/freight-data";
import {
  AirMethods,
  FreightCategories,
  RoadMethods,
} from "@/types/freight-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { calculateAirDistance } from "../api/calculate-distance";
import { calculateAirEmission } from "../api/calculate-emission/air";
import AirAssessCard from "./air-assess-card";
import LabelledLoadInput from "@/components/form/labelled-load-input";
import {
  CreationState,
  shipmentCreateLabel,
} from "@/types/shipment-creation-types";
import { useRouter } from "next/navigation";

export type LatLong = {
  latitude: number;
  longitude: number;
};
const AirForm: React.FC<{
  defaultData?: IAirValidator;
  state: CreationState;
  method: AirMethods;
}> = ({ defaultData, state, method }) => {
  const form = useForm<IAirValidator>({
    resolver: zodResolver(airValidator),
    defaultValues: defaultData || {
      method: AirMethods.INTERNATIONAL,
      category: FreightCategories.AIRWAYS,
      count: 1,
    },
  });

  const [emissionData, setEmissionData] = useState<AirShipmentData>();
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const date = form.watch("date");
  const reset = () => {
    form.reset();
    setShow(false);
    setEmissionData(undefined);
    if (state.state === "editing") router.push("/dashboard/shipment/new/");
  };
  const onSubmit = async (data: IAirValidator) => {
    try {
      setLoading(true);
      const distance = await calculateAirDistance(
        data.origin,
        data.destination
      );
      const shipmentData = calculateAirEmission(data, distance, method);
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
            Air -{" "}
            {method === AirMethods.DOMESTIC ? "Domestic" : "International"}
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
              <AirportSearchFormInput
                control={form.control}
                label="Origin"
                name="origin"
                placeholder="Origin Airport"
              />
              <AirportSearchFormInput
                control={form.control}
                label="Destination"
                name="destination"
                placeholder="Destination Airport"
              />

              <LabelledFormInput
                label="Load in MT"
                control={form.control}
                name="load"
                placeholder="0.00"
                type="number"
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

      {show && (
        <AirAssessCard reset={reset} data={emissionData!} state={state} />
      )}
    </div>
  );
};

export default AirForm;
