import { z } from "zod";
import { airValidator } from "./air-validator";
import { FreightCategories, RailwayMethods } from "@/types/freight-types";

export const railValidator = z.object({
  category: z.literal(FreightCategories.RAILWAY),
  method: z.enum([
    RailwayMethods.Standard,
  ]),
  load: z.coerce.number().min(0.001),

  origin: z.string().min(1),
  destination: z.string().min(1),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  count: z.coerce.number().min(1),
});
export type IRailValidator = z.infer<typeof railValidator>;
