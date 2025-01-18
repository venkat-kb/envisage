"use server";
import moment from "moment";
import { prisma } from "@/lib/db";
import { FreightCategories } from "@/types/freight-types";
import { M_PLUS_1 } from "next/font/google";

export const DashboardData = async (year: number, userId: string) => {
  const shipmentsGroupedByCategory = await prisma.shipment.groupBy({
    by: ["category"],
    _count: true,
    _sum: {
      co2e: true,
      load: true,
    },
    where: {
      AND: [
        {
          userId,
          from: {
            gte: new Date(year, 3, 1),
          },
          to: {
            lte: new Date(year + 1, 2, 31),
          },
        },
      ],
    },
  });
  const monthlyAggregates = new Array(12).fill(0);
  const shipments = await prisma.shipment.findMany({
    where: {
      AND: [
        {
          from: {
            gte: new Date(year, 3, 1),
          },
          to: {
            lte: new Date(year + 1, 2, 31),
          },
          userId,
        },
      ],
    },
  });

  let thisMonth = 0;

  shipments.forEach((shipment) => {
    const month = shipment.from.getMonth();
    monthlyAggregates[month] += shipment.co2e / 1000;
    if (month === new Date().getMonth()) thisMonth += shipment.co2e;
  });

  for (let i = 0; i < 3; ++i) monthlyAggregates.push(monthlyAggregates.shift());
  const data = {
    [FreightCategories.AIRWAYS]: {
      co2e:
        shipmentsGroupedByCategory.find(
          (category) => category.category === FreightCategories.AIRWAYS
        )?._sum.co2e ?? 0,
      load:
        shipmentsGroupedByCategory.find(
          (category) => category.category === FreightCategories.AIRWAYS
        )?._sum.load ?? 0,
    },
    [FreightCategories.ROADWAYS]: {
      co2e:
        shipmentsGroupedByCategory.find(
          (category) => category.category === FreightCategories.ROADWAYS
        )?._sum.co2e ?? 0,
      load:
        shipmentsGroupedByCategory.find(
          (category) => category.category === FreightCategories.ROADWAYS
        )?._sum.load ?? 0,
    },
    [FreightCategories.WATERWAYS]: {
      co2e:
        shipmentsGroupedByCategory.find(
          (category) => category.category === FreightCategories.WATERWAYS
        )?._sum.co2e ?? 0,
      load:
        shipmentsGroupedByCategory.find(
          (category) => category.category === FreightCategories.WATERWAYS
        )?._sum.load ?? 0,
    },
    [FreightCategories.RAILWAY]: {
      co2e:
        shipmentsGroupedByCategory.find(
          (category) => category.category === FreightCategories.RAILWAY
        )?._sum.co2e ?? 0,
      load:
        shipmentsGroupedByCategory.find(
          (category) => category.category === FreightCategories.RAILWAY
        )?._sum.load ?? 0,
    },
  };
  const road = data["Road"].load;
  const air = data["Air"].load;
  const rail = data["Rail"].load;
  const water = data["Water"].load;
  const total = road + air + rail + water === 0 ? 1 : road + air + rail + water;
  const roadPercent = road / total;
  const railPercent = rail / total;
  const waterPercent = water / total;
  const score = roadPercent * 0.33 + waterPercent * 1 + railPercent * 0.66;

  const thisWeekDate = moment().startOf("week").toDate();
  const lastWeekDate = moment().startOf("week").subtract(1, "week").toDate();
  const thisWeekCo2e = shipments
    .filter((item) => item.from >= thisWeekDate)
    .map((item) => item.co2e)
    .reduce((a, b) => a + b, 0);
  const lastWeekCo2e = shipments
    .filter((item) => item.from >= lastWeekDate && item.from < thisWeekDate)
    .map((item) => item.co2e)
    .reduce((a, b) => a + b, 0);

  const thisMonthDate = moment().startOf("month").toDate();

  const lastMonthDate = moment().startOf("month").subtract(1, "month").toDate();

  const thisMonthCo2e = shipments.reduce((acc, item) => {
    if (item.from >= thisMonthDate) {
      return acc + item.co2e;
    }
    return acc;
  }, 0);
  const lastMonthCo2e = shipments.reduce((acc, item) => {
    if (item.from >= lastMonthDate && item.from < thisMonthDate) {
      return acc + item.co2e;
    }
    return acc;
  }, 0);
  const thisWeekPercentage = Math.max(
    -1,
    Math.min(
      (thisWeekCo2e - lastWeekCo2e) / (lastWeekCo2e === 0 ? 1 : lastWeekCo2e),
      1
    )
  );

  const thisMonthPercentage = Math.max(
    -1,
    Math.min(
      (thisMonthCo2e - lastMonthCo2e) /
        (lastMonthCo2e === 0 ? 1 : lastMonthCo2e),
      1
    )
  );
  return {
    monthlyAggregates,
    score: score * 100,
    data,
    thisMonthCo2e,
    thisWeekCo2e,
    thisWeekPercentage,
    thisMonthPercentage,
  };
};
