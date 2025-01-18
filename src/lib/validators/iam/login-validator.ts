import { z } from "zod";

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type ILogin = z.infer<typeof loginValidator>;
