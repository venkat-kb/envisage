"use client";
import AutocompleteFormInput from "@/components/form/autocomplete-form-input";
import LabelledFormInput from "@/components/form/labelled-form-input";
import LabelledLoadInput from "@/components/form/labelled-load-input";
import RoadSearchFormInput from "@/components/form/road-search-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FreightCategories, RailwayMethods } from "@/types/freight-types";
import { ArrowDown, Ship } from "lucide-react";
import { useForm } from "react-hook-form";
import CheckpointForm from "./checkpoint-form";
import { RoadVehicleEmissionData } from "../shipment/new/point-to-point/intercity-form";
import { WaterEmission } from "@prisma/client";
import { ICheckpoint } from "@/lib/validators/tce/checkpoint-validator";
import { useState } from "react";
import RenderCheckpoint from "./render-checkpoint";
import { ITCE, TCEValidator } from "@/lib/validators/tce/tce-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { COASTAL_PORTS } from "@/data/coastal-ports";
import AirportSearchFormInput from "@/components/form/airport-search-input";
import RailSearchFormInput from "@/components/form/rail-search-form-input";
import VesselSelectFormInput from "@/components/form/vessel-select-form-input";
import RoadVehicleSelectFormInput from "@/components/form/road-vehicle-select-form-input";
import DatePickerFormInput from "@/components/form/date-picker-form-input";
import { CreateChainShipments } from "./create-chain";
import { AssessChainShipment } from "./assess-chain";
import { ShipmentData } from "@/types/freight-data";
import TCEFlow from "./flow";
import { ReactFlowProvider } from "reactflow";
import { Icons } from "@/components/ui/icons";
import TCEAssessCard from "./assess-card";

const TransportChainForm: React.FC<{
  roadData: RoadVehicleEmissionData[];
  waterData: WaterEmission[];
}> = ({ roadData, waterData }) => {
  const form = useForm<ITCE>({
    resolver: zodResolver(TCEValidator),
    defaultValues: {
      category: FreightCategories.ROADWAYS,
      // capacity: "ANY",
      // destination: "New Delhi",
      // origin: "Panipat",
      // fuel: "Diesel",
      // load: 1,
    },
  });
  const [checkpoints, setCheckpoints] = useState<ICheckpoint[]>([]);
  const [vessel, size] = form.watch(["type", "size"]);
  const [showFlow, setShowFlow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState<ShipmentData[]>([
    // {
    //   category: FreightCategories.RAILWAY,
    //   co2e: 1,
    //   count: 1,
    //   data: {},
    //   destination: "New Delhi",
    //   origin: "Panipat",
    //   distance: 1,
    //   from: new Date(),
    //   to: new Date(),
    //   load: 1,
    //   method: RailwayMethods.Standard,
    //   ttw: 1,
    //   wtt: 1,
    // },
    // {
    //   category: FreightCategories.RAILWAY,
    //   co2e: 1,
    //   count: 1,
    //   data: {},
    //   destination: "New Delhi",
    //   origin: "Panipat",
    //   distance: 1,
    //   from: new Date(),
    //   to: new Date(),
    //   load: 1,
    //   method: RailwayMethods.Standard,
    //   ttw: 1,
    //   wtt: 1,
    // },
    // {
    //   category: FreightCategories.RAILWAY,
    //   co2e: 1,
    //   count: 1,
    //   data: {},
    //   destination: "New Delhi",
    //   origin: "Panipat",
    //   distance: 1,
    //   from: new Date(),
    //   to: new Date(),
    //   load: 1,
    //   method: RailwayMethods.Standard,
    //   ttw: 1,
    //   wtt: 1,
    // },
    // {
    //   category: FreightCategories.RAILWAY,
    //   co2e: 1,
    //   count: 1,
    //   data: {},
    //   destination: "New Delhi",
    //   origin: "Panipat",
    //   distance: 1,
    //   from: new Date(),
    //   to: new Date(),
    //   load: 1,
    //   method: RailwayMethods.Standard,
    //   ttw: 1,
    //   wtt: 1,
    // },
  ]);
  const [hubs, setHubs] = useState<ICheckpoint[]>([
    // {
    //   location: "Panipat",
    //   category: FreightCategories.RAILWAY,
    // },
    // {
    //   location: "New Delhi",
    //   category: FreightCategories.RAILWAY,
    // },
    // {
    //   location: "Panipat",
    //   category: FreightCategories.RAILWAY,
    // },
    // {
    //   location: "New Delhi",
    //   category: FreightCategories.RAILWAY,
    // },
    // {
    //   location: "New Delhi",
    //   category: FreightCategories.RAILWAY,
    // },
  ]);
  const [baseData, setBaseData] = useState<ITCE>();
  const vehicleType = form.watch(["vehicleType", "fuel"]);
  const category = form.watch("category");
  const date = form.watch("date");

  const addCheckpoint = (x: ICheckpoint) => setCheckpoints((p) => [...p, x]);
  const onSubmit = async (data: ITCE) => {
    setLoading(true);
    const shipments = await CreateChainShipments(data, checkpoints);
    console.log(shipments);
    const emissions = await AssessChainShipment(
      shipments.shipments,
      roadData,
      waterData
    );
    setBaseData(data);
    setHubs(shipments.checkpoints);
    setShipmentData(emissions);
    setLoading(false);
    setShowFlow(true);
  };

  if (showFlow)
    return (
      <>
        <ReactFlowProvider>
          <TCEFlow hubs={hubs} shipments={shipmentData} />
        </ReactFlowProvider>
        <TCEAssessCard
          hubs={hubs}
          onBack={() => setShowFlow(false)}
          shipments={shipmentData}
          base={baseData!}
          data={{
            co2e: shipmentData.reduce((a, b) => a + b.co2e, 0),
            distance: shipmentData.reduce((a, b) => a + b.distance, 0),
            wtt: shipmentData.reduce((a, b) => a + b.wtt, 0),
            ttw: shipmentData.reduce((a, b) => a + b.ttw, 0),
            origin: shipmentData[0].origin,
            destination: shipmentData[shipmentData.length - 1].destination,
          }}
        />
      </>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadow-md rounded-md max-h-[90vh] bg-gray-100 space-y-4 flex flex-col w-full max-w-[750px] gap-8 overflow-auto p-4 border backdrop-blur-[2px]"
      >
        <div className="flex gap-4">
          <div className="space-y-4">
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
          </div>
          <LabelledLoadInput
            control={form.control}
            label="Load in MT"
            name="load"
            placeholder="0 MT"
          />
        </div>
        <Card className="shadow-md">
          <CardHeader className="py-2">
            <CardDescription className="text-center">
              Join your transportation operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 px-3 pb-4">
            {checkpoints.map((c, i) => (
              <RenderCheckpoint
                data={c}
                key={i}
                remove={() =>
                  setCheckpoints((p) => p.filter((x, j) => j !== i))
                }
              />
            ))}
            <CheckpointForm
              addCheckpoint={addCheckpoint}
              roadData={roadData}
              waterData={waterData}
            />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <div className="flex gap-4">
            <AutocompleteFormInput
              options={Object.entries(FreightCategories).map((x) => ({
                label: x[1],
                value: x[1],
              }))}
              control={form.control}
              label="Destination Freight Method"
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
                label="Destination"
                name="destination"
                placeholder="Destination"
              />
            )}
            {category === FreightCategories.ROADWAYS && (
              <RoadSearchFormInput
                control={form.control}
                label="Destination"
                name="destination"
                placeholder="Destination"
              />
            )}
            {category === FreightCategories.AIRWAYS && (
              <AirportSearchFormInput
                control={form.control}
                label="Destination"
                name="destination"
                placeholder="Destination"
              />
            )}
            {category === FreightCategories.RAILWAY && (
              <RailSearchFormInput
                control={form.control}
                label="Destination"
                name="destination"
                placeholder="Destination"
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
          <Button type="submit" disabled={loading}>
            {loading && <Icons.spinner className="animate-spin mr-2" />}Create
            Chain
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransportChainForm;
