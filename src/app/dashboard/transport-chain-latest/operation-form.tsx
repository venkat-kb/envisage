"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const OperationForm: React.FC<{}> = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-u-2"></form>
    </Form>
  );
};
