"use client";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Icons } from "../ui/icons";

const SelectFormInput: React.FC<{
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  isLoading?: boolean;
  options: { label: string; value: number | string }[];
  isTransform?: boolean;
  isDisabled?: boolean;
}> = ({
  name,
  control,
  isTransform = false,
  placeholder,
  label,
  options,
  isLoading = false,
  isDisabled = false,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem>
          <FormLabel aria-required>{label}</FormLabel>
          <Select
            disabled={isDisabled}
            onValueChange={(e) => field.onChange(isTransform ? parseInt(e) : e)}
            defaultValue={
              field.value === undefined
                ? ""
                : isTransform
                ? field.value.toString()
                : field.value
            }
            value={
              field.value === undefined
                ? ""
                : isTransform
                ? field.value.toString()
                : field.value
            }
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={placeholder}
                  className="line-clamp-1"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-60 overflow-auto">
              {isLoading ? (
                <Icons.spinner className="animate-spin mx-auto my-2" />
              ) : (
                options.map((option) => (
                  <SelectItem
                    key={option.value}
                    // @ts-ignore
                    value={isTransform ? option.value.toString() : option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </FormItem>
      );
    }}
  />
);

export default SelectFormInput;
