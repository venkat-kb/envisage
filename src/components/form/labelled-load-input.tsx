"use client";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ChevronsUpDown, InfoIcon } from "lucide-react";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { TEU_TYPE, TEU_TYPES } from "@/data/teu";

const LabelledLoadInput: React.FC<{
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  isDisabled?: boolean;
  type?: "text" | "number" | "password";
  id?: string;
  dir?: "horizontal" | "vertical";
  tooltip?: string;
  required?: boolean;
}> = ({
  isDisabled = false,
  type = "text",
  name,
  control,
  placeholder,
  label,
  id,
  dir = "vertical",
  tooltip,
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const [teu, setTeu] = useState<TEU_TYPE>("Standard (Tonne)");
  const [input, setInput] = useState("");
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            "font-medium " + dir === "horizontal"
              ? "flex gap-8 items-center"
              : "space-y-2"
          }
        >
          <FormLabel
            aria-required
            className={
              dir === "horizontal"
                ? "flex gap-2 min-w-[180px] max-w-[180px]"
                : "flex gap-2"
            }
          >
            {label}
            {required && " *"}
            {tooltip && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger
                    type="button"
                    className={
                      dir === "horizontal"
                        ? "ml-auto"
                        : "flex max-w-max items-center gap-1 text-muted-foreground text-xs"
                    }
                  >
                    <InfoIcon size={16} />
                  </TooltipTrigger>
                  <TooltipContent className="p-2 max-w-[400px] bg-black text-gray-200">
                    {tooltip}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </FormLabel>
          <div className="flex max-w-[450px] gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  disabled={isDisabled}
                  variant="outline"
                  role="combobox"
                  className={cn("w-[200px] justify-between truncate")}
                >
                  {teu}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No suggestions found.</CommandEmpty>
                    <CommandGroup>
                      {Object.keys(TEU_TYPES).map((opt) => {
                        return (
                          <CommandItem
                            value={opt}
                            key={opt}
                            onSelect={() => {
                              if (isNaN(Number(input))) {
                                field.onChange(0);
                              } else {
                                field.onChange(
                                  Number(input) * TEU_TYPES[opt as TEU_TYPE]
                                );
                              }
                              setTeu(opt as TEU_TYPE);
                              setOpen(false);
                            }}
                          >
                            {opt}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Input
              placeholder="Quantity"
              className="min-w-0 w-[100px]"
              onChange={(e) => {
                setInput(e.target.value);
                if (isNaN(Number(e.target.value))) {
                  field.onChange(0);
                } else {
                  field.onChange(Number(e.target.value) * TEU_TYPES[teu]);
                }
              }}
              value={input}
            />
          </div>
          <div className="flex gap-2 max-w-[450px]">
            <Input disabled value={"MT"} className="w-12" />
            <FormControl className="">
              <Input
                id={id}
                disabled={true}
                type={type === "number" ? "text" : type}
                placeholder={placeholder}
                onChange={(e) => {
                  // if (type === "number") field.onChange(Number(e.target.value));
                  field.onChange(e.target.value);
                  // else if (type !== "number") field.onChange(e.target.value);
                }}
                className={
                  dir === "horizontal" ? "max-w-[250px]" : "max-w-[250px]"
                }
                value={field.value?.toString() ?? ""}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};

export default LabelledLoadInput;
