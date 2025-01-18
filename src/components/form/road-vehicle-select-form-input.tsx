"use client";
import { RoadVehicleEmissionData } from "@/app/dashboard/shipment/new/point-to-point/intercity-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, Truck } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Fragment, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { Control, UseFormSetValue } from "react-hook-form";

const RoadVehicleSelectFormInput: React.FC<{
  data: RoadVehicleEmissionData[];
  control: Control<any>;
  name: string;
  label: string;
  setValue: UseFormSetValue<any>;
  vehicleType: [string?, string?];
  fuelName?: string;
  capacityName?: string;
  vehicleTypeName?: string;
}> = ({
  data,
  control,
  label,
  name,
  vehicleType,
  setValue,
  capacityName,
  fuelName,
  vehicleTypeName,
}) => {
  const [open, setOpen] = useState(false);
  const roadData = useMemo(() => {
    const roadData: Record<string, RoadVehicleEmissionData[]> = {};
    data.forEach((d) => {
      if (!roadData[d.type]) {
        roadData[d.type] = [];
      }
      roadData[d.type].push(d);
    });
    return roadData;
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
                <Truck size={16} className="mr-1" />
                {vehicleType[0] ? vehicleType[0] : "Select Vehicle"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Select Vehicle" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>

                  {Object.entries(roadData).map(([key, d]) => (
                    <Fragment key={key}>
                      <CommandGroup>
                        <p className="pl-2 text-xs ">{key}</p>
                        {d.map(({ fuel, capacity }) => {
                          return (
                            <CommandItem
                              key={`${key} - ${fuel}`}
                              value={`${key} - ${fuel}`}
                              className="text-xs text-muted-foreground flex justify-between"
                              onSelect={() => {
                                setOpen(false);

                                setValue(fuelName ?? "fuel", fuel);
                                setValue(vehicleTypeName ?? "vehicleType", key);
                                setValue(capacityName ?? "capacity", capacity);
                              }}
                            >
                              {fuel}
                              {vehicleType[0] === key &&
                                vehicleType[1] === fuel && <Check size={14} />}
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

export default RoadVehicleSelectFormInput;
