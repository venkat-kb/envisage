import { RailShipmentData } from "@/types/freight-data";
import RailForm from "./rail-form";
import { prisma } from "@/lib/db";
import { IRailValidator } from "@/lib/validators/shipment/rail-validator";
import { CreationState } from "@/types/shipment-creation-types";

export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: { id: string; editing: string; recreating: string };
}) {
  let defaultData: IRailValidator | undefined;
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
    })) as RailShipmentData;
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
  return <RailForm defaultData={defaultData} state={state} />;
}
