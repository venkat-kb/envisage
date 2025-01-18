"use client";
import { FreightCategoryIcons } from "@/data/freight-categories";
import AirportSearchFormInput from "@/components/form/airport-search-input";
import RoadSearchFormInput from "@/components/form/road-search-input";
import SliderWithoutThumb from "@/components/slider-without-thumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  ICompareValidator,
  compareValidator,
} from "@/lib/validators/compare-validator";
import { FreightCategories } from "@/types/freight-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CompareCardData } from "./compare-card";

export default function CompareInputForm({
  onSave,
  data,
}: {
  onSave: (
    data: ICompareValidator,
    categories: FreightCategories[]
  ) => Promise<void>;
  data: CompareCardData[];
}) {
  const [categories, setCategories] = useState<FreightCategories[]>([
    FreightCategories.ROADWAYS,
  ]);
  const toast = useToast().toast;
  const [loading, setLoading] = useState(false);
  const form = useForm<ICompareValidator>({
    resolver: zodResolver(compareValidator),
  });

  const onExport = () => {
    const exportData: (number | string)[][] = [
      [
        "Freight Method",
        "Origin",
        "Destination",
        "Direct Route",
        "Total Distance (KM)",
        "Well To Tank Emission (KG)",
        "Tank To Wheel Emission (KG)",
        "Total Emission (KG)",
        "Emission Intensity (KG CO2e / MT Load)",
      ],
    ];
    data.forEach((item) => {
      const dataItem = item.data[item.data.length - 1];
      exportData.push([
        item.category,
        dataItem.origin.replace(",", ""),
        dataItem.destination.replace(",", ""),
        item.data.length > 1 ? "No" : "Yes",
        dataItem.distance,
        dataItem.wtt,
        dataItem.ttw,
        dataItem.co2e,
        dataItem.co2e,
      ]);
    });
    const csv = exportData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8," });
    const objUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objUrl;
    a.download = "COMPARE_EMISSIONS.csv";
    a.click();
  };

  return (
    <Card className={`w-[450px] shadow-xl max-h-max h-max`}>
      <CardHeader>
        <CardTitle>Compare Freight Emission</CardTitle>
        <CardDescription>
          Compare freight emission across various freight categories. Shown data
          will be under the assumption of static 1 MT Load.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((x: ICompareValidator) => {
              if (categories.length === 0) {
                toast({
                  title: "Whoops!",
                  description: "Please add atleast one category",
                  variant: "destructive",
                });
                return;
              }
              setLoading(true);
              onSave(x, categories).then(() => setLoading(false));
            })}
          >
            <div className="space-y-2">
              <Label>Modes of Freight</Label>
              <div className="flex gap-2">
                {Object.values(FreightCategories).map((item) => {
                  const Icon = FreightCategoryIcons[item as FreightCategories];
                  return (
                    <div
                      key={item}
                      onClick={() => {
                        if (categories.includes(item)) {
                          setCategories((s) => s.filter((i) => i !== item));
                          return;
                        }
                        setCategories((s) => [...s, item]);
                      }}
                      className={`flex  relative cursor-pointer w-[100px] text-white bg-black flex-col items-center justify-center border rounded p-2
                        ${
                          categories.includes(item) ? "bg-blue-600" : "bg-black"
                        }
                      `}
                    >
                      {categories.includes(item) && (
                        <Check className="absolute top-2 right-2 h-3 w-4" />
                      )}
                      <Icon
                        className={
                          "h-6 w-6 "
                          //  + categories.includes(item)
                          //   ? "text-green-600"
                          //   : ""
                        }
                      />
                      <span className="text-xs">{item}ways</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <RoadSearchFormInput
              control={form.control}
              name="origin"
              label="Origin"
              placeholder="New delhi"
            />
            <RoadSearchFormInput
              control={form.control}
              name="destination"
              label="Destination"
              placeholder="Bangalore"
            />
            {/* {categories.includes(FreightCategories.AIRWAYS) && (
              <>
                <AirportSearchFormInput
                  control={form.control}
                  label="Origin Airport"
                  name="originAirport"
                  placeholder="DEL New Delhi"
                />
                <AirportSearchFormInput
                  control={form.control}
                  label="Destination Airport"
                  name="destinationAirport"
                  placeholder="MAA Chennai" /> </>)} */}
            <div className="flex gap-4 w-full items-center">
              <Button type="submit" disabled={loading}>
                Compare
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onExport}
                className={`${data.length === 0 ? "hidden" : ""}`}
                disabled={data.length === 0}
              >
                Download CSV
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
