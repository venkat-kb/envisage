"use client";

import LabelledFormInput from "@/components/form/labelled-form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  ICreateUser,
  createUserValidator,
} from "@/lib/validators/iam/create-user-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createNewUser } from "./api";
import { Icons } from "@/components/ui/icons";

export default function Page() {
  const form = useForm<ICreateUser>({
    resolver: zodResolver(createUserValidator),
  });
  const toast = useToast().toast;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ICreateUser) => {
    setLoading(true);
    createNewUser(data)
      .then((res) => {
        if (res) {
          toast({
            title: "Success!",
            description: "New user has been created successfully",
          });
        } else {
          toast({
            title: "Whoops!",
            description: "Failed to create user",
            variant: "destructive",
          });
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <Card className="max-w-[500px] w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Create New User</CardTitle>
        <CardDescription>
          New user will have active status by default
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <LabelledFormInput
              control={form.control}
              label="Name"
              name="name"
              placeholder="John Doe"
            />
            <LabelledFormInput
              control={form.control}
              label="Email"
              name="email"
              placeholder="jane.doe@gmail.com"
            />
            <LabelledFormInput
              control={form.control}
              label="Password"
              name="password"
              placeholder="********"
            />
            <LabelledFormInput
              control={form.control}
              label="Contact Number"
              name="contactNumber"
              placeholder="1234567890"
            />
            <LabelledFormInput
              control={form.control}
              label="Company Name"
              name="companyName"
              placeholder="Company Inc."
            />
            <LabelledFormInput
              control={form.control}
              label="Company Address"
              name="companyAddress"
              placeholder="1234 Company St."
            />
            <Button type="submit" disabled={loading}>
              {loading && (
                <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
