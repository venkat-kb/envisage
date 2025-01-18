"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const CustomSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full slider-range bg-green-600" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className=" relative block h-5 w-5 rounded-full border-2 border-green-500 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      <p className="absolute bottom-[-30px] text-green-700 font-semibold ">
        {props.value![0].toFixed(0)}%
      </p>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
CustomSlider.displayName = SliderPrimitive.Root.displayName;

export default CustomSlider;
