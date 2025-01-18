"use client";

import AutocompleteFormInput from "@/components/form/autocomplete-form-input";
import RoadSearchFormInput from "@/components/form/road-search-input";
import { FreightCategories } from "@/types/freight-types";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkpointValidator,
  ICheckpoint,
} from "@/lib/validators/tce/checkpoint-validator";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { RoadVehicleEmissionData } from "../shipment/new/point-to-point/intercity-form";
import { WaterEmission } from "@prisma/client";
import RoadVehicleSelectFormInput from "@/components/form/road-vehicle-select-form-input";
import VesselSelectFormInput from "@/components/form/vessel-select-form-input";
import { COASTAL_PORTS } from "@/data/coastal-ports";
import AirportSearchFormInput from "@/components/form/airport-search-input";
import RailSearchFormInput from "@/components/form/rail-search-form-input";

const CheckpointForm: React.FC<{
  roadData: RoadVehicleEmissionData[];
  waterData: WaterEmission[];
  addCheckpoint: (x: ICheckpoint) => void;
}> = ({ roadData, waterData, addCheckpoint }) => {
  const form = useForm<ICheckpoint>({
    resolver: zodResolver(checkpointValidator),
    defaultValues: {
      category: FreightCategories.ROADWAYS,
      location: "",
    },
  });
  const [show, setShow] = useState(false);
  const onSubmit = (data: ICheckpoint) => {
    addCheckpoint(data);
    form.reset(form.formState.defaultValues);
    setShow(false);
  };

  const category = form.watch("category");
  const vehicleType = form.watch(["vehicleType", "fuel"]);
  const size = form.watch("size");
  const vessel = form.watch("type");
  useEffect(() => {
    form.setValue("location", "");
  }, [category]);
  if (!show)
    return <Button onClick={() => setShow(true)}>Add Checkpoint</Button>;
  else
    return (
      <Form {...form}>
        <form className="space-y-4 bg-slate-50 shadow p-3">
          <div className="flex gap-4">
            <AutocompleteFormInput
              options={Object.entries(FreightCategories).map((x) => ({
                label: x[1],
                value: x[1],
              }))}
              control={form.control}
              label="Freight Method"
              name="category"
              placeholder="Air, Road, Water, Rail"
              setTerm={(x: string) => {}}
            />
            {category === FreightCategories.WATERWAYS && (
              <AutocompleteFormInput
                setTerm={(x) => {}}
                options={COASTAL_PORTS.map((item) => ({
                  label: item.origin,
                  value: item.origin,
                }))}
                control={form.control}
                label="Location"
                name="location"
                placeholder="Location"
              />
            )}
            {category === FreightCategories.ROADWAYS && (
              <RoadSearchFormInput
                control={form.control}
                label="Location"
                name="location"
                placeholder="Location"
              />
            )}
            {category === FreightCategories.AIRWAYS && (
              <AirportSearchFormInput
                control={form.control}
                label="Location"
                name="location"
                placeholder="Location"
              />
            )}
            {category === FreightCategories.RAILWAY && (
              <RailSearchFormInput
                control={form.control}
                label="Location"
                name="location"
                placeholder="Location"
              />
            )}
          </div>
          {category === FreightCategories.WATERWAYS && (
            <VesselSelectFormInput
              control={form.control}
              data={waterData}
              label="Vessel Type"
              name="type"
              setValue={form.setValue}
              size={size}
              vessel={vessel}
            />
          )}
          {category === FreightCategories.ROADWAYS && (
            <RoadVehicleSelectFormInput
              control={form.control}
              data={roadData}
              label="Vehicle Type"
              name="vehicleType"
              setValue={form.setValue}
              vehicleType={vehicleType}
            />
          )}
          <div className="flex w-full justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <Check className="mr-2" />
              Confirm Checkpoint
            </Button>
          </div>
        </form>
      </Form>
    );
};

export default CheckpointForm;
