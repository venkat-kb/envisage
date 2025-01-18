import { z } from "zod";

export const compareValidator = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  originAirport: z.string().optional(),
  destinationAirport: z.string().optional(),
  originRailwayStation: z.string().optional(),
  destinationRailwayStation: z.string().optional(),
});

export type ICompareValidator = z.infer<typeof compareValidator>;
