"use server";
import { prisma } from "@/lib/db";
import { ICreateUser } from "@/lib/validators/iam/create-user-validator";
import { cookies } from "next/headers";

export const RegisterAPI = async (data: ICreateUser) => {
  const cookieStore = cookies();
  try {
    const { email, password, ...profile } = data;
    const user = await prisma.user.create({
      data: {
        email,
        password,
        Profile: {
          create: profile,
        },
      },
    });
    cookieStore.set("userId", user.id, {
      // 1 d
      expires: new Date(Date.now() + 86400000),
    });
    return true;
  } catch (e) {
    console.error("Error Creating User:", e);
    return false;
  }
};
