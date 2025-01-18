"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ILogin,
  loginValidator,
} from "../../lib/validators/iam/login-validator";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { createNewUser } from "../admin/users/new/api";
import {
  createUserValidator,
  ICreateUser,
} from "@/lib/validators/iam/create-user-validator";
import { RegisterAPI } from "./api";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ICreateUser>({
    resolver: zodResolver(createUserValidator),
    defaultValues: {
      companyAddress: " ",
      contactNumber: " ",
    },
  });

  const onSubmit = async (data: ICreateUser) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await RegisterAPI(data);
    if (res) {
      toast({
        title: "Success!",
        description:
          "You have successfully registered, loading your dashboard...",
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Whoops!",
        description: "There was an error creating your account",
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-[100vh]">
      <Link
        href="/"
        className="absolute top-4 left-4 font-bold text-2xl text-blue-500"
      >
        ULIP
      </Link>
      <div className="flex items-center justify-center py-12 h-[100vh]">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Create your new account
            </p>
          </div>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <FormField
                name="companyName"
                control={form.control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <FormLabel htmlFor="companyName">Company</FormLabel>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Acme Limited"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      {/* <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link> */}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
