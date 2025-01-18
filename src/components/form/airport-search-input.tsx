"use client";
import { searchAirport } from "@/app/dashboard/shipment/new/api/auto-complete";
import { useDebounce } from "@/hooks/use-debounce";
import { startTransition, useEffect, useState } from "react";
import AutocompleteFormInput from "./autocomplete-form-input";
import { Control } from "react-hook-form";

const AirportSearchFormInput: React.FC<{
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
}> = ({ control, label, name, placeholder }) => {
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState("");
  const debTerm = useDebounce(term, 500);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    if (debTerm && debTerm.length >= 3) {
      setLoading(true);
      searchAirport(debTerm).then((data) => {
        startTransition(() => {
          setLoading(false);
          setOptions(data);
        });
      });
    }
  }, [debTerm]);
  return (
    <AutocompleteFormInput
      control={control}
      label={label}
      name={name}
      placeholder={placeholder}
      setTerm={setTerm}
      options={options}
      isLoading={loading}
    />
  );
};

export default AirportSearchFormInput;
