"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  IRailValidator,
  railValidator,
} from "@/lib/validators/shipment/rail-validator";
import { RailShipmentData } from "@/types/freight-data";
import {
  AirMethods,
  FreightCategories,
  RailwayMethods,
} from "@/types/freight-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { calculateRailDistance } from "../api/calculate-distance";
import { calculateRailEmission } from "../api/calculate-emission/rail";
import DatePickerFormInput from "@/components/form/date-picker-form-input";
import RoadSearchFormInput from "@/components/form/road-search-input";
import LabelledFormInput from "@/components/form/labelled-form-input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Package } from "lucide-react";
import RailAssessCard from "./rail-assess-card";
import { Form } from "@/components/ui/form";
import LabelledLoadInput from "@/components/form/labelled-load-input";
import {
  CreationState,
  shipmentCreateLabel,
} from "@/types/shipment-creation-types";
import { useRouter } from "next/navigation";
import RailSearchFormInput from "@/components/form/rail-search-form-input";

const RailForm: React.FC<{
  defaultData?: IRailValidator;
  state: CreationState;
}> = ({ defaultData, state }) => {
  const form = useForm<IRailValidator>({
    resolver: zodResolver(railValidator),
    defaultValues: defaultData || {
      method: RailwayMethods.Standard,
      category: FreightCategories.RAILWAY,
      count: 1,
    },
  });

  const [emissionData, setEmissionData] = useState<RailShipmentData>();
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = form.watch("date");
  const router = useRouter();
  const reset = () => {
    form.reset();
    setShow(false);
    setEmissionData(undefined);
    if (state.state === "editing") router.push("/dashboard/shipment/new/");
  };
  const onSubmit = async (data: IRailValidator) => {
    try {
      setLoading(true);
      const distance = await calculateRailDistance(
        data.origin,
        data.destination
      );
      const shipmentData = calculateRailEmission(data, distance);
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
            Railway - Standard
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
              <RailSearchFormInput
                control={form.control}
                label="Origin"
                name="origin"
                placeholder="Origin Railway Station"
              />
              <RailSearchFormInput
                control={form.control}
                label="Destination"
                name="destination"
                placeholder="Destination Railway Station"
              />

              <LabelledLoadInput
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
        <RailAssessCard data={emissionData!} reset={reset} state={state} />
      )}
    </div>
  );
};

export default RailForm;
