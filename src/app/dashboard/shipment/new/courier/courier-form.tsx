"use client";
import LabelledFormInput from "@/components/form/labelled-form-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ICourierValidator,
  IRoadValidator,
  courierValidator,
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
import { Icons } from "@/components/ui/icons";
import { calculateRoadDistance } from "../api/calculate-distance";
import { CourierShipmentData, RoadShipmentData } from "@/types/freight-data";
import {
  calculateCourierEmission,
  calculateRoadEmission,
} from "../api/calculate-emission/road";
import { useToast } from "@/components/ui/use-toast";
import { createShipment } from "../api/create-shipment";
import CourierAssessCard from "./courier-assess-card";
import LabelledLoadInput from "@/components/form/labelled-load-input";
import { RoadVehicleEmissionData } from "../point-to-point/intercity-form";
import SwitchFormInput from "@/components/form/switch-form-input";
import { CreationState } from "@/types/shipment-creation-types";
import { useRouter } from "next/navigation";

const CourierForm: React.FC<{
  data: RoadVehicleEmissionData[];
  defaultData?: ICourierValidator;
  state: CreationState;
}> = ({ data, defaultData, state }) => {
  const form = useForm<ICourierValidator>({
    resolver: zodResolver(courierValidator),
    defaultValues: defaultData || {
      method: RoadMethods.COURIER,
      category: FreightCategories.ROADWAYS,
      count: 1,
      midMileVehicleType:
        "Medium Commercial Vehicles - 2 | GVW 5 to 12 MT | Payload Capacity 3.5 to 8 MT",
      midMileFuel: "Diesel",
      midMileCapacity: "3.5 to 8 MT",
      firstMileVehicleType:
        "Small Commercial Vehicles | GVW < 3.5 MT | Payload Capacity 0.5 to 2 MT",
      firstMileFuel: "Diesel",
      firstMileCapacity: "0.5 to 2 MT",
      lastMileCapacity: "0.5 to 2 MT",
      lastMileFuel: "Diesel",
      lastMileVehicleType:
        "Small Commercial Vehicles | GVW < 3.5 MT | Payload Capacity 0.5 to 2 MT",
      isRefrigerated: false,
    },
  });
  const router = useRouter();
  const [emissionData, setEmissionData] = useState<CourierShipmentData>();
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = form.watch("date");
  const vehicleTypeFirstMile = form.watch([
    "firstMileVehicleType",
    "firstMileFuel",
  ]);
  const vehicleTypeMidMile = form.watch(["midMileVehicleType", "midMileFuel"]);
  const vehicleTypeLastMile = form.watch([
    "lastMileVehicleType",
    "lastMileFuel",
  ]);
  console.log(vehicleTypeFirstMile);

  const reset = () => {
    form.reset();
    setShow(false);
    setEmissionData(undefined);
    if (state.state === "editing") router.push("/dashboard/shipment/new/");
  };
  const onSubmit = async (formData: ICourierValidator) => {
    try {
      setLoading(true);
      const distanceOriginToOriginHub = await calculateRoadDistance(
        formData.origin,
        formData.originHub
      );
      const distanceOriginHubToDestinationHub = await calculateRoadDistance(
        formData.originHub,
        formData.destinationHub
      );
      const distanceDestinationHubToDestination = await calculateRoadDistance(
        formData.destinationHub,
        formData.destination
      );
      const shipmentData = calculateCourierEmission(
        formData,
        [
          distanceOriginToOriginHub,
          distanceOriginHubToDestinationHub,
          distanceDestinationHubToDestination,
        ],
        data
      );
      setEmissionData(shipmentData);
      await createShipment(shipmentData);
      setShow(true);
    } catch (error) {
      toast({
        title: "Whoops!",
        variant: "destructive",
        description: "Failed to calculate emission. Please try again.",
      });
    } finally {
      setLoading(false);
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
              New Shipment{" "}
            </span>
            <br />
            Road - Express Courier | Part Truck Load
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col"
            >
              <DatePickerFormInput
                control={form.control}
                label="Shipment Date Range"
                name="date"
                date={date}
              />
              <div className="flex gap-4">
                <RoadSearchFormInput
                  control={form.control}
                  label="Origin"
                  name="origin"
                  placeholder="Origin Location"
                />
                <RoadVehicleSelectFormInput
                  data={data}
                  control={form.control}
                  label="First Mile Vehicle"
                  name="firstMileVehicleType"
                  vehicleType={vehicleTypeFirstMile}
                  setValue={form.setValue}
                  capacityName="firstMileCapacity"
                  fuelName="firstMileFuel"
                  vehicleTypeName="firstMileVehicleType"
                />
              </div>

              <div className="flex gap-4">
                <RoadSearchFormInput
                  control={form.control}
                  label="Origin Hub"
                  name="originHub"
                  placeholder="Origin Hub Location"
                />
                <RoadVehicleSelectFormInput
                  data={data}
                  control={form.control}
                  label="Mid Mile Vehicle"
                  name="midMileVehicleType"
                  vehicleType={vehicleTypeMidMile}
                  capacityName="midMileCapacity"
                  fuelName="midMileFuel"
                  vehicleTypeName="midMileVehicleType"
                  setValue={form.setValue}
                />
              </div>
              <div className="flex gap-4">
                <RoadSearchFormInput
                  control={form.control}
                  label="Destination Hub"
                  name="destinationHub"
                  placeholder="Destination Hub Location"
                />
                <RoadVehicleSelectFormInput
                  data={data}
                  control={form.control}
                  label="Last Mile Vehicle"
                  vehicleTypeName="lastMileVehicleType"
                  capacityName="lastMileCapacity"
                  fuelName="lastMileFuel"
                  name="lastMileVehicleType"
                  vehicleType={vehicleTypeLastMile}
                  setValue={form.setValue}
                />
              </div>

              <RoadSearchFormInput
                control={form.control}
                label="Destination"
                name="destination"
                placeholder="Destination Location"
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

              <Button className="w-[100px]" type="submit" disabled={loading}>
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
        <CourierAssessCard reset={reset} data={emissionData!} state={state} />
      )}
    </div>
  );
};

export default CourierForm;
