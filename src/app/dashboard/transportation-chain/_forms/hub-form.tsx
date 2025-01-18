"use client";
import AirportSearchFormInput from "@/components/form/airport-search-input";
import AutocompleteFormInput from "@/components/form/autocomplete-form-input";
import RoadSearchFormInput from "@/components/form/road-search-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  IHubValidator,
  hubValidator,
} from "@/lib/validators/tce/hub-validator";
import { FreightCategories, RoadMethods } from "@/types/freight-types";
import { FreightHubs, Hubs } from "@/types/hub-location-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  calculateAirDistance,
  calculateRailDistance,
  calculateRoadDistance,
  getRoadEmissions,
} from "../../shipment/new/api/calculate-distance";
import { ShipmentDataTCE } from "../useTransportChain";
import { calculateAirEmissionTCE } from "../../shipment/new/api/calculate-emission/air";
import { calculateRailEmissionTCE } from "../../shipment/new/api/calculate-emission/rail";
import { calculateRoadEmissionTCE } from "../../shipment/new/api/calculate-emission/road";
import LabelledFormInput from "@/components/form/labelled-form-input";
import RoadVehicleSelectFormInput from "@/components/form/road-vehicle-select-form-input";
import { RoadVehicleEmissionData } from "../../shipment/new/point-to-point/intercity-form";
import { Icons } from "@/components/ui/icons";

const hubTypes: { label: FreightHubs; value: FreightHubs }[] = [
  {
    label: FreightHubs.Airport,
    value: FreightHubs.Airport,
  },
  {
    label: FreightHubs.CoastalPort,
    value: FreightHubs.CoastalPort,
  },
  {
    label: FreightHubs.RailwayStation,
    value: FreightHubs.RailwayStation,
  },
  {
    label: FreightHubs.LandHub,
    value: FreightHubs.LandHub,
  },
];

const HubForm: React.FC<{
  getFreightCategories: (currentHubType: FreightHubs) => FreightCategories[];
  showFreight: boolean;
  setHubs: Dispatch<SetStateAction<Hubs[]>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  hubs: Hubs[];
  setShipments: Dispatch<SetStateAction<ShipmentDataTCE[]>>;
}> = ({
  getFreightCategories,
  showFreight,
  setHubs,
  setShow,
  hubs,
  setShipments,
}) => {
  const form = useForm<IHubValidator>({
    resolver: zodResolver(hubValidator),
  });

  const [loading, setLoading] = useState(false);
  const hubType = form.watch("type");
  const freight = form.watch("freight");
  const [methods, setMethods] = useState<FreightCategories[]>([]);
  useEffect(() => {
    if (!hubType || !showFreight) return;
    setMethods(getFreightCategories(hubType));
  }, [hubType]);

  const vehicleType = form.watch(["vehicleType", "fuel"]);
  const [roadEmission, setRoadEmissions] = useState<RoadVehicleEmissionData[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const roadEmission = await getRoadEmissions();
      setRoadEmissions(roadEmission);
    })();
  }, []);

  const onSubmit = async (data: IHubValidator) => {
    if (!showFreight) {
      setHubs((i) => [...i, data]);
      setShow(false);
      return;
    }
    setLoading(true);

    const firstHub = hubs[0];
    const load = firstHub.load!;
    const prevHub = hubs[hubs.length - 1];
    //AIR
    if (data.freight === FreightCategories.AIRWAYS) {
      const distance = await calculateAirDistance(prevHub.name, data.name);
      const shipmentData = calculateAirEmissionTCE(
        {
          destination: data.name,
          origin: prevHub.name,
          load,
          count: 1,
        },
        distance
      );
      setShipments((i) => [...i, shipmentData]);
    }
    // RAIL
    else if (data.freight === FreightCategories.RAILWAY) {
      const distance = await calculateRailDistance(prevHub.name, data.name);
      const shipmentData = calculateRailEmissionTCE(
        {
          destination: data.name,
          origin: prevHub.name,
          load,
          count: 1,
        },
        distance
      );
      setShipments((i) => [...i, shipmentData]);
    }
    //ROAD
    else if (data.freight === FreightCategories.ROADWAYS) {
      const distance = await calculateRoadDistance(prevHub.name, data.name);

      const shipmentData = calculateRoadEmissionTCE(
        roadEmission,
        {
          capacity: data.capacity!,
          category: FreightCategories.ROADWAYS,
          destination: data.name,
          load,
          fuel: data.fuel!,
          method: RoadMethods.PointToPoint,
          origin: prevHub.name,
          vehicleType: data.vehicleType!,
          count: 1,
          isRefrigerated: false,
        },
        distance
      );
      setShipments((i) => [...i, shipmentData]);
    }
    setHubs((i) => [...i, data]);
    setShow(false);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 border p-2 rounded bg-secondary"
      >
        <AutocompleteFormInput
          control={form.control}
          label="Hub Type"
          name="type"
          options={hubTypes}
          placeholder="Search location.."
          setTerm={(x: string) => {}}
        />

        {(() => {
          switch (hubType) {
            case FreightHubs.Airport:
              return (
                <AirportSearchFormInput
                  control={form.control}
                  label="Hub Name"
                  name="name"
                  placeholder="Search Airport.."
                />
              );
            case FreightHubs.RailwayStation:
              return (
                <RoadSearchFormInput
                  control={form.control}
                  label="Hub Name"
                  name="name"
                  placeholder="Search Railway Station.."
                />
              );
            case FreightHubs.LandHub:
              return (
                <RoadSearchFormInput
                  control={form.control}
                  label="Hub Name"
                  name="name"
                  placeholder="Search Hub.."
                />
              );
            default:
              return (
                <RoadSearchFormInput
                  control={form.control}
                  label="Hub Name"
                  name="name"
                  placeholder="Search Hub.."
                  isDisabled
                />
              );
          }
        })()}
        {showFreight && (
          <AutocompleteFormInput
            isDisabled={!hubType}
            control={form.control}
            label="Freight Method"
            name="freight"
            options={methods.map((i) => ({ label: i, value: i }))}
            placeholder="Select Method.."
            setTerm={(x: string) => {}}
          />
        )}
        {freight === FreightCategories.ROADWAYS && (
          <RoadVehicleSelectFormInput
            data={roadEmission}
            vehicleType={vehicleType}
            setValue={form.setValue}
            control={form.control}
            label="Vehicle Type"
            name="vehicleType"
          />
        )}
        {!showFreight && (
          <LabelledFormInput
            label="Load in MT"
            control={form.control}
            name="load"
            placeholder="0.00"
            type="number"
          />
        )}
        <Button type="submit" className="max-w-[120px]">
          {loading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <>
              <CheckIcon size={16} className="mr-2" />
              Add Hub
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default HubForm;
