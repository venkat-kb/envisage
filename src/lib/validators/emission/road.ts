"use client";
import { z } from "zod";

export const roadEmissionValidator = z.object({
  type: z.string().min(1),
  ttw: z.coerce.number().min(0.001),
  wtt: z.coerce.number().min(0.001),
  fuel: z.string().min(1),
  capacity: z.string().min(1),
});

export type IRoadEmission = z.infer<typeof roadEmissionValidator>;
