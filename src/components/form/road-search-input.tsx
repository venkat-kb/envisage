"use client";
import { Control } from "react-hook-form";
import AutocompleteFormInput from "./autocomplete-form-input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchRoadPlace } from "@/app/dashboard/shipment/new/api/auto-complete";
import { Client as GoogleMapsClient } from "@googlemaps/google-maps-services-js";
import axios from "axios";

const RoadSearchFormInput: React.FC<{
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  isDisabled?: boolean;
}> = ({ control, label, name, placeholder, isDisabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState("");
  const debTerm = useDebounce(term, 500);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    if (debTerm && debTerm.length >= 3) {
      setLoading(true);
      SearchRoadPlace(debTerm).then((data) => {
        setOptions(data);
        setLoading(false);
      });
    }
  }, [debTerm]);
  return (
    <AutocompleteFormInput
      control={control}
      label={label}
      name={name}
      isDisabled={isDisabled}
      placeholder={placeholder}
      setTerm={setTerm}
      options={options}
      isLoading={loading}
    />
  );
};
export default RoadSearchFormInput;
