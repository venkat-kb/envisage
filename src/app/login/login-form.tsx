"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoginAPI } from "./api";
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

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ILogin>({
    resolver: zodResolver(loginValidator),
  });

  const onSubmit = async (data: ILogin) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await LoginAPI(data.email, data.password);
    if (res.success) {
      toast({
        title: "Welcome back!",
        description:
          "You have successfully logged in, loading your dashboard...",
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Whoops!",
        description: "Please check your email and password",
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
      <div className="flex items-center justify-center py-12  h-[100vh]">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
