import { z } from "zod";

export const createUserValidator = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  companyAddress: z.string().min(1),
  companyName: z.string().min(1),
  name: z.string().min(1),
  contactNumber: z.string().min(1),
});

export type ICreateUser = z.infer<typeof createUserValidator>;

export const updateUserValidator = z
  .object({
    active: z.boolean(),
  })
  .merge(createUserValidator);

export type IUpdateUser = z.infer<typeof updateUserValidator>;
