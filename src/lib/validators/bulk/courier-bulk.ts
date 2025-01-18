import { z } from "zod";
import { bulkBaseSchema } from "./base";

export const bulkCourierValidator = z
  .object({
    originHub: z.string().min(1, { message: "Origin Hub is required" }),
    destinationHub: z
      .string()
      .min(1, { message: "Destination Hub is required" }),
  })
  .merge(bulkBaseSchema);

export type IBulkCourier = z.infer<typeof bulkCourierValidator>;
