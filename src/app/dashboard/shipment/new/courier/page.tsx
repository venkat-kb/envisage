import { prisma } from "@/lib/db";
import CourierForm from "./courier-form";
import { ICourierValidator } from "@/lib/validators/shipment/road-validators";
import { CreationState } from "@/types/shipment-creation-types";
import { CourierShipmentData } from "@/types/freight-data";

export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: { id: string; editing: string; recreating: string };
}) {
  const emissions = await prisma.roadVehicle.findMany();
  let defaultData: ICourierValidator | undefined;
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
    })) as unknown as CourierShipmentData;
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
      origin: data.origin,
      originHub: data.data.originHub,
      destinationHub: data.data.destinationHub,
      destination: data.destination,
      isRefrigerated: false,
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
      load: data.load,
      method: data.method,
    };
  }

  return (
    <CourierForm data={emissions} state={state} defaultData={defaultData} />
  );
}
