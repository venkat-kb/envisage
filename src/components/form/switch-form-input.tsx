"use client;";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";

const SwitchFormInput: React.FC<{
  control: Control<any>;
  name: string;
  label: string;
  isDisabled?: boolean;
}> = ({ isDisabled = false, name, control, label }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={"font-medium flex gap-4 items-center"}>
        <FormLabel aria-required className="py-0">
          {label}
        </FormLabel>
        <FormControl>
          <Switch
            disabled={isDisabled}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export default SwitchFormInput;
