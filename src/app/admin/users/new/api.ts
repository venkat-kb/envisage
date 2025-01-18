"use server";

import { prisma } from "@/lib/db";
import {
  ICreateUser,
  IUpdateUser,
} from "@/lib/validators/iam/create-user-validator";

export const createNewUser = async (data: ICreateUser) => {
  try {
    const { email, password, ...profile } = data;
    await prisma.user.create({
      data: {
        email,
        password,
        Profile: {
          create: profile,
        },
      },
    });
    return true;
  } catch (e) {
    console.error("Error Createing User:", e);
    return false;
  }
};

export const updateUser = async (id: string, data: IUpdateUser) => {
  try {
    const { email, password, active, ...profile } = data;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password,
        Active: active,
        Profile: {
          update: profile,
        },
      },
    });
    return true;
  } catch (e) {
    console.error("Error Updating User:", e);
    return false;
  }
};
