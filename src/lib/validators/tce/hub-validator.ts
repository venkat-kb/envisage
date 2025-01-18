import { FreightCategories } from "@/types/freight-types";
import { FreightHubs } from "@/types/hub-location-types";
import { z } from "zod";

export const hubValidator = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(FreightHubs),
  freight: z.nativeEnum(FreightCategories).optional(),
  load: z.coerce.number().min(0.001),
  vehicleType: z.string().min(1).optional(),
  capacity: z.string().min(1).optional(),
  fuel: z.string().min(1).optional(),
});

export type IHubValidator = z.infer<typeof hubValidator>;
