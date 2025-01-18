import { prisma } from "@/lib/db";
import IntercityForm from "./intercity-form";
import { IRoadValidator } from "@/lib/validators/shipment/road-validators";
import { CreationState } from "@/types/shipment-creation-types";
import { RoadShipmentData } from "@/types/freight-data";

export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: { id: string; editing: string; recreating: string };
}) {
  const data = await prisma.roadVehicle.findMany();
  let defaultData: IRoadValidator | undefined;
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
    })) as unknown as RoadShipmentData;
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
      capacity: data.data.capacity,
      fuel: data.data.fuel,
      isRefrigerated: data.data.isRefrigerated ?? false,
      vehicleType: data.data.vehicleType,
    };
  }
  return <IntercityForm data={data} defaultData={defaultData} state={state} />;
}
