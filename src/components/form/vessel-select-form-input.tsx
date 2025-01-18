"use client";
import { WaterEmission } from "@prisma/client";
import { Fragment, useMemo, useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, Ship } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Separator } from "../ui/separator";

const VesselSelectFormInput: React.FC<{
  data: WaterEmission[];
  control: Control<any>;
  name: string;
  label: string;
  setValue: UseFormSetValue<any>;
  vessel?: string;
  size?: string;
}> = ({ data, control, label, name, vessel, setValue, size }) => {
  const [open, setOpen] = useState(false);
  const vessels = useMemo(() => {
    const vesselData: Record<string, WaterEmission[]> = {};
    data.forEach((d) => {
      if (!vesselData[d.name]) {
        vesselData[d.name] = [];
      }
      vesselData[d.name].push(d);
    });
    return vesselData;
  }, []);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[300px] justify-start  truncate"
              >
                <Ship size={16} className="mr-1" />
                {vessel ? `${vessel} | ${size}` : "Select Vessel"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search Vessel" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>

                  {Object.entries(vessels).map(([vessel, d]) => (
                    <Fragment key={vessel}>
                      <CommandGroup>
                        <p className="pl-2 text-xs">{vessel}</p>
                        {d.map((item) => {
                          return (
                            <CommandItem
                              key={`${vessel} - ${item.size}`}
                              value={`${vessel} - ${item.size}`}
                              className="text-xs text-muted-foreground flex justify-between"
                              onSelect={() => {
                                setOpen(false);
                                setValue("type", vessel);
                                setValue("size", item.size);
                              }}
                            >
                              {item.size}
                              {item.size === vessel && vessel === vessel && (
                                <Check size={14} />
                              )}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                      <Separator className="w-[80%] mx-auto" />
                    </Fragment>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default VesselSelectFormInput;
