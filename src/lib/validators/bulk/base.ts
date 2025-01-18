import { z } from "zod";

export const bulkBaseSchema = z.object({
  start: z.date({
    description: "Start date of the trip",
    required_error: "Start date is required",
  }),
  end: z.date({
    required_error: "End date is required",
    description: "End date of the trip",
  }),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  tripCount: z.coerce.number().min(1, "Trip count is required"),
  load: z.coerce.number().min(0.001, "Load is required"),
});
