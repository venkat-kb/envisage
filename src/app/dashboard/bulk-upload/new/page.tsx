"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FileUploadInput from "./upload-input";
import { Fragment, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  AirMethods,
  FreightCategories,
  FreightMethods,
  RailwayMethods,
  RoadMethods,
  WaterMethods,
} from "@/types/freight-types";
import { Separator } from "@/components/ui/separator";
import TemplateCard from "./template-card";
import {
  FreightCategoryIcons,
  FreightMethodsMap,
} from "@/data/freight-categories";
import { sheetValidator } from "../_parser/bulk-handler";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { RoadShipmentData, ShipmentData } from "@/types/freight-data";
import { flushSync } from "react-dom";
import BulkDataDialog from "./data-dialog";
import {
  calculateBulkCour,
  calculateBulkRoad,
} from "../../shipment/new/api/calculate-emission/road";
import {
  getRoadEmissions,
  getWaterEmissions,
} from "../../shipment/new/api/calculate-distance";
import { Icons } from "@/components/ui/icons";
import BulkSaveDialog from "./save-dialog";
import { createBulk } from "../api/create";
import { useRouter } from "next/navigation";
import { calculateBulkAirEmission } from "../../shipment/new/api/calculate-emission/air";
import {
  calculateBulkCoastalEmission,
  calculateBulkInternationalWaterEmission,
} from "../../shipment/new/api/calculate-emission/coastal";
import { calculateBulkRail } from "../../shipment/new/api/calculate-emission/rail";

export type BulkValidateShipmentData = ShipmentData & { status: 0 | 1 | 2 };

export default function Page() {
  const router = useRouter();
  const [file, setFile] = useState<File | undefined>();
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState("");
  const toast = useToast();
  const [validated, setValidated] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [refID, setRef] = useState("");
  const [validatedData, setValidatedData] = useState<
    BulkValidateShipmentData[]
  >([]);
  const [rowCount, setRowCount] = useState(0);

  const [showModalData, setShowModalData] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const onReset = () => {
    setFile(undefined);
    setMethod("");
    setValidatedData([]);
    setProcessing(false);
    setShowModalConfirm(false);
    setShowModalData(false);
    setValidated(false);
  };
  const onValidate = () => {
    sheetValidator(file!, method as FreightMethods)
      .then(async (data) => {
        setProcessing(true);
        setRowCount(data.length);
        flushSync(() => setShowModalData(true));
        const table = document.getElementById("bulk-table")!;
        let i = 0;
        const emissions = await getRoadEmissions();
        const waterEmissions = await getWaterEmissions();
        for (const item of data) {
          i++;
          // if (i > 2) break;
          const { date, origin, destination, load, count, category, ...rest } =
            item;
          const newData: BulkValidateShipmentData = {
            from: date.from,
            to: date.to,
            origin,
            destination,
            load,
            count,
            data: rest,
            category,
            co2e: 0,
            distance: 0,
            method: method as RoadMethods,
            ttw: 0,
            wtt: 0,
            status: 0,
          };
          flushSync(() => setValidatedData((p) => [...p, newData]));
          table.scrollTo({
            top: table.scrollHeight,
            behavior: "smooth",
          });
          await new Promise((r) => setTimeout(r, 500));
          let calc: BulkValidateShipmentData;
          try {
            switch (method) {
              case RoadMethods.COURIER:
                calc = await calculateBulkCour(newData, emissions);
                break;
              case RoadMethods.PointToPoint:
                calc = await calculateBulkRoad(
                  emissions,
                  newData as RoadShipmentData
                );
                break;
              case AirMethods.INTERNATIONAL:
              case AirMethods.DOMESTIC:
                calc = await calculateBulkAirEmission(newData, method);
                break;
              case WaterMethods.COASTAL:
                calc = await calculateBulkCoastalEmission(
                  newData,
                  waterEmissions
                );
                break;
              case WaterMethods.INTERNATIONAL_WATER:
                calc = await calculateBulkInternationalWaterEmission(
                  newData,
                  waterEmissions
                );
                break;
              case RailwayMethods.Standard:
                calc = await calculateBulkRail(newData);
            }
          } catch (e) {
            calc = { ...newData, status: 2 };
            console.error(e);
            toast.toast({
              title: "Non Disruptive Error",
              description: "Error calculating row " + i + ", skipping...",
              variant: "destructive",
            });
          }

          //  const newValidated[validatedData.length-1] = {...newValidated[validatedData.length-1], ...calc}
          flushSync(() =>
            setValidatedData((p) => {
              const newValidated = [...p];
              newValidated[p.length - 1] = {
                ...calc,
              };
              return newValidated;
            })
          );
        }
        setValidated(true);
        setProcessing(false);
      })
      .catch((e) => {
        console.error(e);
        toast.toast({
          title: "Error Validating Sheet, Resetting...",
          description: e.message,
          variant: "destructive",
        });
        onReset();
      })
      .catch((e) => {
        console.error(e);
        toast.toast({
          title: "Error Validating Sheet, Resetting...",
          description: e.message,
          variant: "destructive",
        });
        onReset();
      });
  };

  const onShowConfirm = () => {
    setShowModalData(false);
    setShowModalConfirm(true);
  };

  const onSave = async () => {
    try {
      const data = await createBulk(
        refID,
        validatedData.map(({ status, ...rest }) => rest)
      );
      toast.toast({
        title: "Data Saved Successfully",
        description: "Redirecting to data...",
      });
      router.push("/dashboard/bulk-upload/" + data.bulk.id);
    } catch (e) {
      console.error(e);
      toast.toast({
        title: "Error Saving Data",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <BulkSaveDialog
        onSave={onSave}
        open={showModalConfirm}
        setOpen={setShowModalConfirm}
        rows={rowCount}
        setRef={setRef}
        refID={refID}
      />
      <BulkDataDialog
        processing={processing}
        rowCount={rowCount}
        open={showModalData}
        setOpen={setShowModalData}
        data={validatedData}
        onSave={onShowConfirm}
      />
      <div className="flex gap-2">
        <Card className="max-w-[400px] max-h-max">
          <CardHeader className="bg-secondary pb-4">
            <CardTitle className="text-lg">Bulk Upload</CardTitle>
            <CardDescription>
              Upload a template excel file containing the emissions data for a
              particular freight mode.
              <br />
              <span className="font-semibold">Upto 100 rows allowed. </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap mb-4 mt-6 gap-3">
              <Label>Freight Method</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between"
                    disabled={processing}
                  >
                    {method ? method : "Select freight..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search frieght..." />
                    <CommandEmpty>No Method found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {Object.keys(FreightMethodsMap).map((freight) => {
                          const f =
                            FreightMethodsMap[freight as FreightCategories];
                          const Icon =
                            FreightCategoryIcons[freight as FreightCategories];
                          return (
                            <Fragment key={freight}>
                              <div className="flex gap-2 pl-4">
                                <Icon />
                                <p className="font-semibold">{freight}</p>
                              </div>

                              {f.map((method) => (
                                <CommandItem
                                  key={method.label}
                                  value={method.label}
                                  className="pl-4 justify-start"
                                  onSelect={(currentValue) => {
                                    setMethod(method.label);
                                    setOpen(false);
                                  }}
                                >
                                  {method.label}
                                </CommandItem>
                              ))}
                              <Separator className="my-2 mx-auto max-w-[80%]" />
                            </Fragment>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <FileUploadInput file={file} setFile={setFile} name="file" />
            {processing || validated ? (
              <div className="flex gap-2 mt-4">
                <Button
                  variant={"outline"}
                  onClick={() => setShowModalData(true)}
                >
                  View{" "}
                  {processing ? (
                    <Icons.spinner className="animate-spin h-3 w-3 ml-2" />
                  ) : (
                    <Check className="h-3 w-3 ml-2" />
                  )}
                </Button>
                <Button onClick={onReset} variant="destructive">
                  Reset
                </Button>
              </div>
            ) : (
              <Button
                className="mt-4"
                disabled={file === undefined || method === ""}
                onClick={onValidate}
                variant="outline"
              >
                Validate Excel
              </Button>
            )}
          </CardContent>
        </Card>
        <TemplateCard />
      </div>
    </>
  );
}
