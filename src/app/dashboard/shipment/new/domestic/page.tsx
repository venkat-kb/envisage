import { AirMethods } from "@/types/freight-types";
import AirForm from "./air-form";
import { IAirValidator } from "@/lib/validators/shipment/air-validator";
import { CreationState } from "@/types/shipment-creation-types";
import { prisma } from "@/lib/db";
import { AirShipmentData } from "@/types/freight-data";

export type LatLong = {
  latitude: number;
  longitude: number;
};

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string; editing: string; recreating: string };
}) {
  let defaultData: IAirValidator | undefined;
  let state: CreationState = { state: "default" };
  if (searchParams.editing || searchParams.recreating) {
    state = {
      id: searchParams.id,
      state: searchParams.editing ? "editing" : "recreating",
    };
    const data = (await prisma.shipment.findFirst({
      where: {
        id: searchParams.id,
      },
    })) as AirShipmentData;
    if (!data) {
      return <>NOT FOUND</>;
    }
    defaultData = {
      category: data.category,
      count: data.count,
      date: {
        from: data.from,
        to: data.to,
      },
      destination: data.destination,
      load: data.load,
      method: data.method,
      origin: data.origin,
    };
  }
  return (
    <AirForm
      defaultData={defaultData}
      state={state}
      method={AirMethods.DOMESTIC}
    />
  );
}
