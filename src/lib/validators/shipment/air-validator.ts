import { AirMethods, FreightCategories } from "@/types/freight-types";
import { z } from "zod";

export const airValidator = z.object({
  category: z.literal(FreightCategories.AIRWAYS),
  method: z.enum([AirMethods.DOMESTIC, AirMethods.INTERNATIONAL]),
  load: z.coerce.number().min(0.001),
  origin: z.string().min(1),
  destination: z.string().min(1),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  count: z.coerce.number().min(1),
});
//   .merge(base);

export type IAirValidator = z.infer<typeof airValidator>;
