import { FreightCategories } from "@/types/freight-types";
import { z } from "zod";

const checkpointBase = z.object({
  location: z.string().min(1),
});

export const checkpointValidator = checkpointBase
  .extend({
    vehicleType: z.string().min(1),
    capacity: z.string().min(1),
    fuel: z.string().min(1),
    category: z.enum([FreightCategories.ROADWAYS]),
  })
  .or(
    checkpointBase.extend({
      size: z.string().min(1),
      type: z.string().min(1),
      category: z.enum([FreightCategories.WATERWAYS]),
    })
  )
  .or(
    checkpointBase.extend({
      category: z.enum([FreightCategories.AIRWAYS]),
    })
  )
  .or(
    checkpointBase.extend({
      category: z.enum([FreightCategories.RAILWAY]),
    })
  );

export type ICheckpoint = z.infer<typeof checkpointValidator>;

// export type ICheckpoint = z.infer<typeof checkpointValidator>;
