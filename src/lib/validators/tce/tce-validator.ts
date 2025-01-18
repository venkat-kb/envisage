import { FreightCategories } from "@/types/freight-types";
import { z } from "zod";

const BaseTCEValidator = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  load: z.coerce.number().min(0.001),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export const TCEValidator = BaseTCEValidator.extend({
  vehicleType: z.string().min(1),
  capacity: z.string().min(1),
  fuel: z.string().min(1),
  category: z.enum([FreightCategories.ROADWAYS]),
})
  .or(
    BaseTCEValidator.extend({
      size: z.string().min(1),
      type: z.string().min(1),
      category: z.enum([FreightCategories.WATERWAYS]),
    })
  )
  .or(
    BaseTCEValidator.extend({
      category: z.enum([FreightCategories.AIRWAYS]),
    })
  )
  .or(
    BaseTCEValidator.extend({
      category: z.enum([FreightCategories.RAILWAY]),
    })
  );

export type ITCE = z.infer<typeof TCEValidator>;
