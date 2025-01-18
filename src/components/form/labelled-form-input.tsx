"use client";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { InfoIcon } from "lucide-react";

const LabelledFormInput: React.FC<{
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
}) => (
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
        <FormControl>
          <Input
            id={id}
            disabled={isDisabled}
            type={type === "number" ? "text" : type}
            placeholder={placeholder}
            onChange={(e) => {
              // if (type === "number") field.onChange(Number(e.target.value));
              field.onChange(e.target.value);
              // else if (type !== "number") field.onChange(e.target.value);
            }}
            className={dir === "horizontal" ? "max-w-[400px]" : "max-w-[400px]"}
            value={field.value ?? ""}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export default LabelledFormInput;
