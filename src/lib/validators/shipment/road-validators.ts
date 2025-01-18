import { FreightCategories, RoadMethods } from "@/types/freight-types";
import z from "zod";

export const roadValidator = z.object({
  category: z.literal(FreightCategories.ROADWAYS),
  method: z.enum([RoadMethods.PointToPoint]),
  load: z.coerce
    .number()
    .min(0.001, { message: "Load must be greater than 0.001" }),
  vehicleType: z.string().min(1, { message: "Vehicle Type is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  fuel: z.string().min(1, { message: "Fuel is required" }),
  origin: z.string().min(1, { message: "Origin is required" }),
  destination: z.string().min(1, { message: "Destination is required" }),
  date: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    { message: "Invalid date" }
  ),
  count: z.coerce.number().min(1, { message: "Count must be greater than 0" }),
  isRefrigerated: z.boolean(),
});
//   .merge(base);

const courier = z.object({
  category: z.literal(FreightCategories.ROADWAYS, {
    message: "Category must be ROADWAYS",
  }),
  method: z.enum([RoadMethods.COURIER], {
    message: "Category must be ROADWAYS",
  }),
  load: z.coerce
    .number()
    .min(0.001, { message: "Load must be greater than 0.001" }),
  origin: z.string().min(1, { message: "Origin is required" }),
  destination: z.string().min(1, { message: "Destination is required" }),
  date: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    { message: "Invalid date" }
  ),
  originHub: z.string().min(1, { message: "Origin Hub is required" }),
  destinationHub: z.string().min(1, { message: "Destination Hub is required" }),
  count: z.coerce.number().min(1, { message: "Count must be greater than 0" }),
  isRefrigerated: z.boolean(),
});

export const courierValidator = courier.or(
  courier.extend({
    firstMileVehicleType: z.string().min(1),
    firstMileFuel: z.string().min(1),
    firstMileCapacity: z.string().min(1),
    midMileVehicleType: z.string().min(1),
    lastMileVehicleType: z.string().min(1),
    midMileFuel: z.string().min(1),
    midMileCapacity: z.string().min(1),
    lastMileFuel: z.string().min(1),
    lastMileCapacity: z.string().min(1),
  })
);

export type IRoadValidator = z.infer<typeof roadValidator>;
export type ICourierValidator = z.infer<typeof courierValidator>;
