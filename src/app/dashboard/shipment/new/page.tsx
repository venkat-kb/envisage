"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FreightCategories, RoadMethods } from "@/types/freight-types";
import Link from "next/link";
import {
  ArrowRight,
  ArrowRightCircle,
  InfoIcon,
  Paperclip,
} from "lucide-react";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import {
  FreightCategoryIcons,
  FreightMethodsMap,
} from "@/data/freight-categories";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

export default function Page() {
  return (
    <NeonGradientCard
      className="overflow-auto max-h-[90vh] max-w-[500px] mx-auto"
      x-chunk="dashboard-05-chunk-4"
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
            Freight Categories <br />
            <span className="font-normal text-muted-foreground text-sm leading-relaxed">
              Create new shipment using the various freight methods
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-x text-sm pt-4">
        <Fragment>
          <div className="grid gap-3">
            <div className="font-semibold flex gap-2 items-center">
              <Paperclip /> <p>E-Way Bill</p>
            </div>
            <ul className="grid gap-3">
              <li className="">
                <Link
                  href={"/dashboard/shipment/new/ewaybill"}
                  className="w-full flex gap-2"
                >
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        className={
                          "flex max-w-max items-center gap-1 text-muted-foreground text-xs"
                        }
                      >
                        <InfoIcon size={16} />
                      </TooltipTrigger>
                      <TooltipContent className="p-2 max-w-[400px] bg-black text-gray-200">
                        E-Way Bill
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="flex items-center hover:text-primary text-muted-foreground justify-between gap-2 w-full">
                    <span>E-Way Bill</span>
                    <ArrowRightCircle className="text-primary" />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
        </Fragment>
        {Object.entries(FreightCategories).map((category, i) => {
          const Icon = FreightCategoryIcons[category[1]];
          return (
            <Fragment key={category[1]}>
              <div key={category[1]} className="grid gap-3">
                <div className="font-semibold flex gap-2 items-center">
                  <Icon /> <p>{category[1]}way Methods</p>
                </div>
                <ul className="grid gap-3">
                  {FreightMethodsMap[category[1]].map((method) => (
                    <li className="">
                      <Link
                        key={method.href}
                        href={method.href}
                        className="w-full flex gap-2"
                      >
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger
                              type="button"
                              className={
                                "flex max-w-max items-center gap-1 text-muted-foreground text-xs"
                              }
                            >
                              <InfoIcon size={16} />
                            </TooltipTrigger>
                            <TooltipContent className="p-2 max-w-[400px] bg-black text-gray-200">
                              {method.tooltip}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <div className="flex items-center hover:text-primary text-muted-foreground justify-between gap-2 w-full">
                          <span>{method.label}</span>
                          <ArrowRightCircle className="text-primary" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {i !== 3 && <Separator className="my-4" />}
            </Fragment>
          );
        })}
      </CardContent>
    </NeonGradientCard>
  );
}
