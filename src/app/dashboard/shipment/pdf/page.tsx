import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import PDFGenerate from "@/components/pdf/pdf-generate";
import { Profile, User } from "@prisma/client";

export default async function Page({
  searchParams,
}: {
  searchParams: { from: string; to: string };
}) {
  const cookieStore = cookies().get("userId");
  const from = new Date(searchParams.from ?? "2024-01-01");
  const to = new Date(searchParams.to ?? "2024-12-31");
  console.log(from, to);
  const data = (
    await prisma.shipment.findMany({
      where: {
        AND: [
          {
            userId: cookieStore?.value!,
          },
          {
            from: {
              gte: new Date(searchParams.from),
            },
          },
          {
            to: {
              lte: new Date(searchParams.to),
            },
          },
        ],
      },
      take: 100,
    })
  ).reverse();

  const user = (await prisma.user.findUnique({
    where: {
      id: cookieStore?.value!,
    },
    include: {
      Profile: true,
    },
  })) as User & { Profile: Profile };

  return <PDFGenerate from={from} to={to} data={data} user={user} />;
}
