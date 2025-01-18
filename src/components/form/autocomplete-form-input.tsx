"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Icons } from "../ui/icons";

const AutocompleteFormInput: React.FC<{
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  options: { label: string; value: number | string }[];
  setTerm: (term: string) => void;
}> = ({
  isDisabled = false,
  control,
  name,
  placeholder,
  label,
  options,
  isLoading,
  setTerm,
}) => {
  const [open, setOpen] = useState(false);
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
                disabled={isDisabled}
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[300px] justify-between truncate",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? field.value : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search..."
                  onChangeCapture={(e) => setTerm(e.currentTarget.value)}
                />
                <CommandList>
                  {isLoading ? (
                    <Icons.spinner className="mx-auto h-4 w-4 animate-spin m-2" />
                  ) : (
                    <>
                      <CommandEmpty>No suggestions found.</CommandEmpty>
                      <CommandGroup>
                        {/* <CommandItem
                          value={"asd"}
                          key={"as"}
                          onSelect={() => {
                            setTerm("asd");
                            field.onChange("asd");
                            setOpen(false);
                          }}
                        >
                          {"asd"}
                        </CommandItem> */}
                        {options.map((opt) => {
                          return (
                            <CommandItem
                              value={opt.label}
                              key={opt.value}
                              onSelect={() => {
                                setTerm(opt.label);
                                field.onChange(opt.value);
                                setOpen(false);
                              }}
                            >
                              {opt.label}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default AutocompleteFormInput;
