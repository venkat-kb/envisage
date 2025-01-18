import { prisma } from "@/lib/db";
import InternationalWaterForm from "./international-water-form";
import { InternationalWaterShipmentData } from "@/types/freight-data";
import { IInternationalWaterValidator } from "@/lib/validators/shipment/coastal-validator";
import { CreationState } from "@/types/shipment-creation-types";

export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: { id: string; editing: string; recreating: string };
}) {
  const data = await prisma.waterEmission.findMany();
  let defaultData: IInternationalWaterValidator | undefined;
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
    })) as unknown as InternationalWaterShipmentData;
    if (!data) {
      return <>NOT FOUND</>;
    }
    defaultData = {
      distance: Math.ceil(data.distance / 1.852),
      category: data.category,
      count: data.count,
      date: {
        from: data.from,
        to: data.to,
      },
      size: data.data.size,
      type: data.data.type,
      destination: data.destination,
      load: data.load,
      method: data.method,
      origin: data.origin,
    };
  }
  return (
    <InternationalWaterForm
      data={data}
      state={state}
      defaultData={defaultData}
    />
  );
}
