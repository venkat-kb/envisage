import { FreightCategories, WaterMethods } from "@/types/freight-types";
import { z } from "zod";

export const coastalValidator = z.object({
  category: z.literal(FreightCategories.WATERWAYS),
  method: z.enum([WaterMethods.COASTAL]),
  origin: z.string().min(1),
  destination: z.string().min(1),
  load: z.coerce.number().min(0.001),
  size: z.string().min(1),
  type: z.string().min(1),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  count: z.coerce.number().min(1),
});

export type ICoastalValidator = z.infer<typeof coastalValidator>;

export const internationalWaterValidator = z.object({
  distance: z.coerce.number().min(1),
  category: z.literal(FreightCategories.WATERWAYS),
  method: z.literal(WaterMethods.INTERNATIONAL_WATER),
  origin: z.string().min(1),
  destination: z.string().min(1),
  load: z.coerce.number().min(0.001),
  size: z.string().min(1),
  type: z.string().min(1),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  count: z.coerce.number().min(1),
});

export type IInternationalWaterValidator = z.infer<
  typeof internationalWaterValidator
>;
