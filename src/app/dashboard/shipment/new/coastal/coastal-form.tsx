"use client";
import { COASTAL_PORTS } from "@/data/coastal-ports";
import AutocompleteFormInput from "@/components/form/autocomplete-form-input";
import DatePickerFormInput from "@/components/form/date-picker-form-input";
import LabelledFormInput from "@/components/form/labelled-form-input";
import VesselSelectFormInput from "@/components/form/vessel-select-form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import {
  ICoastalValidator,
  coastalValidator,
} from "@/lib/validators/shipment/coastal-validator";
import { CoastalShipmentData } from "@/types/freight-data";
import { FreightCategories, WaterMethods } from "@/types/freight-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { WaterEmission } from "@prisma/client";
import { Package } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  calculateCoastalDistance,
  calculateRoadDistance,
} from "../api/calculate-distance";
import { calculateCoastalEmission } from "../api/calculate-emission/coastal";
import CoastalAssessCard from "./coastal-assess-card";
import LabelledLoadInput from "@/components/form/labelled-load-input";
import {
  CreationState,
  shipmentCreateLabel,
} from "@/types/shipment-creation-types";
import { useRouter } from "next/navigation";

const CoastalForm: React.FC<{
  data: WaterEmission[];
  defaultData?: ICoastalValidator;
  state: CreationState;
}> = ({ data, defaultData, state }) => {
  const form = useForm<ICoastalValidator>({
    resolver: zodResolver(coastalValidator),
    defaultValues: defaultData || {
      category: FreightCategories.WATERWAYS,
      method: WaterMethods.COASTAL,
      count: 1,
    },
  });

  const [emissionData, setEmissionData] = useState<CoastalShipmentData>();
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = form.watch("date");
  const vessel = form.watch("type");
  const size = form.watch("size");
  const router = useRouter();
  const onSubmit = async (formData: ICoastalValidator) => {
    try {
      setLoading(true);
      const distance = await calculateCoastalDistance(
        formData.origin,
        formData.destination
      );
      const emission = calculateCoastalEmission(formData, data, distance);
      setEmissionData(emission);
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

  const reset = () => {
    form.reset();
    setShow(false);
    setEmissionData(undefined);
    if (state.state === "editing") router.push("/dashboard/shipment/new/");
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
            Coastal - Domestic
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
              <AutocompleteFormInput
                setTerm={(x) => {}}
                options={COASTAL_PORTS.map((item) => ({
                  label: item.origin,
                  value: item.origin,
                }))}
                control={form.control}
                label="Origin"
                name="origin"
                placeholder="Origin Port"
              />
              <AutocompleteFormInput
                setTerm={(x) => {}}
                options={COASTAL_PORTS.map((item) => ({
                  label: item.origin,
                  value: item.origin,
                }))}
                control={form.control}
                label="Destination"
                name="destination"
                placeholder="Destination Port"
              />
              <VesselSelectFormInput
                control={form.control}
                label="Vessel Type"
                name="name"
                data={data}
                setValue={form.setValue}
                size={size}
                vessel={vessel}
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
        <CoastalAssessCard reset={reset} data={emissionData!} state={state} />
      )}
    </div>
  );
};

export default CoastalForm;
