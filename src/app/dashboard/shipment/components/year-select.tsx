"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const YearSelect: React.FC<{ defaultValue: number }> = ({ defaultValue }) => {
  const router = useRouter();

  return (
    <Select
      defaultValue={defaultValue.toString()}
      onValueChange={(e) => router.push("/dashboard?year=" + e)}
    >
      <SelectTrigger className="w-[140px] mt-0 ml-auto">
        <SelectValue placeholder="Select FY" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fiscal Year</SelectLabel>
          <SelectItem value="2021">FY 2021-22</SelectItem>
          <SelectItem value="2022">FY 2022-23</SelectItem>
          <SelectItem value="2023">FY 2023-24</SelectItem>
          <SelectItem value="2024">FY 2024-25</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default YearSelect;
