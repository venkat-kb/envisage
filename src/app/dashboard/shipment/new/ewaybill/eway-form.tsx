import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import EWayCard from "./eway-card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import LabelledFormInput from "@/components/form/labelled-form-input";
import { Sheet } from "@/components/ui/sheet";
import ExpandedSheet from "@/app/dashboard/compare/components/expanded-sheet";
import { CompareCardData } from "@/app/dashboard/compare/components/compare-card";
import { FreightCategories } from "@/types/freight-types";

const ewayValidator = z.object({
  eway: z.string().length(12, "E-Way Bill number should be 12 characters long"),
});
type IEwayValidator = z.infer<typeof ewayValidator>;

function EWayForm({}) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<IEwayValidator>({
    resolver: zodResolver(ewayValidator),
    defaultValues: {
      eway: "",
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShow(true);
    }, 1000);
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-1 justify-center transition-all overflow-auto">
      <Card
        className={`max-w-[30%] h-min transition-all duration-300 ease-in-out transform ${
          show ? "translate-x-[-3rem]" : ""
        }`}
      >
        <CardHeader className="flex flex-row items-start bg-muted/50 pb-4">
          <div className="grid gap-0.5">
            <CardDescription>
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </CardDescription>
            <CardTitle className="text-lg">
              E-Way Bill <br />
              <span className="font-normal text-muted-foreground text-sm leading-relaxed">
                Create new shipment using your E-Way Bill number
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              {/* <Input placeholder="Enter E-Way Bill Number"  /> */}
              <LabelledFormInput
                label="E-Way Bill Number"
                name="eway"
                control={form.control}
                placeholder="E-Way Bill Number"
              />
              {form.formState.errors.eway && (
                <p className="text-red-500 text-xs mt-2">
                  {form.formState.errors.eway.message}
                </p>
              )}
              <Button className="w-full mt-6" disabled={loading}>
                Assess E-Way Bill
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {show && <EWayCard />}
    </div>
  );
}

export default EWayForm;
