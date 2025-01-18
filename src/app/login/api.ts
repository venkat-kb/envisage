"use server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export const LoginAPI = async (email: string, password: string) => {
  const cookieStore = cookies();
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
  if (!user) {
    return {
      success: false,
    };
  } else {
    cookieStore.set("userId", user.id, {
      // 1 d
      expires: new Date(Date.now() + 86400000),
    });
    const { password, ...rest } = user;
    return {
      success: true,
      user: rest,
    };
  }
};

export const logoutAPI = async () => {
  const cookieStore = cookies();
  cookieStore.delete("userId");
  return {
    success: true,
  };
};
