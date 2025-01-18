import PDFGenerate from "@/components/pdf/pdf-generate";
import { prisma } from "@/lib/db";
import { Profile, User } from "@prisma/client";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: { id: string } }) {
  const bulk = await prisma.bulkShipment.findFirst({
    where: {
      id: params.id,
    },
  });
  if (!bulk) {
    return <>NOT FOUND</>;
  }
  const bulkData = await prisma.shipment.findMany({
    where: {
      bulkRef: bulk.id,
    },
  });
  const cookieStore = cookies().get("userId");

  const user = (await prisma.user.findUnique({
    where: {
      id: cookieStore?.value!,
    },
    include: {
      Profile: true,
    },
  })) as User & { Profile: Profile };
  if (bulkData.length === 0) return <>No data found</>;
  return (
    <PDFGenerate
      from={bulkData[0].from}
      to={bulkData[0].to}
      user={user}
      data={bulkData}
    />
  );
}
