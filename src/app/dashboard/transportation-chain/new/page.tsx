"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Edge, ReactFlowProvider, useReactFlow } from "reactflow";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  PlaneTakeoff,
  Plus,
  Ship,
  TowerControl,
  Train,
  TrainTrack,
  Truck,
  Waves,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HubForm from "../_forms/hub-form";
import { useTransportChain } from "../useTransportChain";
import TCEFlow from "../flow";
import { FreightCategoryIcons } from "@/data/freight-categories";
import ConfirmTSEDialog from "../views/confirm-tse-dialog";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { createShipments, createTSEShipment } from "../api/create";
import { ShipmentData } from "@/types/freight-data";
import { useToast } from "@/components/ui/use-toast";
import { HubIconsMap } from "@/data/tce";
import WorkInProgress from "@/components/work-in-progress";

// @ts-ignore

// const initialNodes: Node<any>[] = [
//   {
//     id: "1",
//     data: { label: "Hello" },
//     position: { x: 0, y: 0 },
//     type: "startNode",
//   },
//   {
//     id: "2",
//     data: {
//       label: "Hub",
//       icon: Building2,
//       address: "Wazirpur Depo, New Delhi",
//     },

//     position: { x: 0, y: 200 },
//     type: "defaultNode",
//   },
//   {
//     id: "3",
//     data: {
//       label: "Port",
//       icon: Ship,
//       address: "Morbai Depo, Mumbai",
//     },

//     position: { x: 0, y: 400 },
//     type: "defaultNode",
//   },
//   {
//     id: "4",
//     data: {
//       label: "Port",
//       icon: Ship,
//       address: "XYZ Port, Kerela",
//     },

//     position: { x: 0, y: 600 },
//     type: "defaultNode",
//   },
// ];
/* 
  const initialEdges: Edge<any>[] = [
    {
      id: "1-2",
      source: "1",
      target: "2",
      label: "to the",
      type: "customEdge",
      data: {
        mode: "Truck",
        distance: "30KM",
        emission: 200,
        onOpen: setOpen,
        icon: Truck,
      },
    },
    {
      id: "2-3",
      source: "2",
      target: "3",
      type: "customEdge",
      data: {
        mode: "Truck",
        distance: "1000KM",
        emission: 1200,
        onOpen: setOpen,
        icon: Truck,
      },
    },
    {
      id: "3-4",
      source: "3",
      target: "4",
      type: "customEdge",
      data: {
        mode: "Vessel",
        distance: "1000KM",
        emission: 100,
        onOpen: setOpen,
        icon: Ship,
      },
    },
  ]; */

export default function Page() {
  const [show, setShow] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const { getFreightCategories, hubs, setHubs, shipments, setShipments } =
    useTransportChain();

  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const onSave = async () => {
    try {
      setLoading(true);
      const shipmentdata = shipments.map((s) => ({
        ...s,
        from: date!.from!,
        to: date!.to!,
      }));
      await createTSEShipment({
        destination: hubs[hubs.length - 1].name,
        origin: hubs[0].name,
        from: date!.from!,
        to: date!.to!,
        hubs,
        // @ts-ignore
        shipment: shipmentdata,
        load: hubs[0].load!,
      });
      await createShipments(
        shipments.map((s) => ({
          ...s,
          from: date!.from!,
          to: date!.to!,
        })) as ShipmentData[]
      );
      toast({
        title: "Transportation Chain Created",
        description: "The Transportation Chain has been created successfully",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description:
          "An error occurred while creating the Transportation Chain",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setShowDialog(false);
    }
  };
  return (
    // <WorkInProgress />
    <div style={{ height: "80vh" }} className=" relative p-2">
      <ConfirmTSEDialog
        open={showDialog}
        setOpen={setShowDialog}
        date={date}
        setDate={setDate as SelectRangeEventHandler}
        onSave={onSave}
      />
      <Accordion
        collapsible
        type="single"
        defaultValue="item-1"
        className="absolute right-4 top-4 z-[0] w-[30vw] max-w-[30vw]"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How To Create a Transport Operation
          </AccordionTrigger>
          <AccordionContent>
            <Card className="max-w-[30vw] max-h-[80vh] overflow-auto">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Transportation Chain</CardTitle>
                <CardDescription>
                  Add transportation chain elements of various types to create a
                  transportation chain
                </CardDescription>

                <div className="grid grid-cols-2 text-muted-foreground">
                  <span className="font-semibold text-muted-foreground">
                    Element Hubs
                  </span>
                  <span className="font-semibold text-muted-foreground">
                    Element Freight Methods
                  </span>
                  <div>
                    <div className="flex gap-2 items-center">
                      <Building2 size={16} />
                      <p>Hub</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Waves size={16} />
                      <p>Coastal Port</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <TowerControl size={16} />
                      <p>Airport</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <TrainTrack size={16} />
                      <p>Railway Station</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <Truck size={16} />
                      <p>Road Vehicle</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Ship size={16} />
                      <p>Water Vessel</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Train size={16} />
                      <p>Train</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <PlaneTakeoff size={16} />
                      <p>Airplane</p>
                    </div>
                  </div>
                </div>
                <CardDescription>
                  Various freight methods require certain types of hubs to
                  operate within. Road Vehicles can operate shipments between
                  any kind of hub.
                </CardDescription>
                <div className="grid grid-cols-3 pt-2 text-muted-foreground">
                  <div className="grid grid-cols-[30px_20px_30px_20px_30px] gap-2 ">
                    <Waves size={24} />
                    <ArrowRight size={12} />
                    <Ship size={20} />
                    <ArrowRight size={12} />
                    <Waves size={24} />

                    <TowerControl size={24} />
                    <ArrowRight size={12} />
                    <PlaneTakeoff size={20} />
                    <ArrowRight size={12} />
                    <TowerControl size={24} />

                    <TrainTrack size={24} />
                    <ArrowRight size={12} />
                    <Train size={20} />

                    <ArrowRight size={12} />
                    <TrainTrack size={24} />
                  </div>
                </div>
              </CardHeader>
              <Separator className="w-[80%] mx-auto" />
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Your Transport Operation</AccordionTrigger>
          <AccordionContent>
            <Card className="max-w-[30vw] max-h-[70vh] overflow-auto">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">
                  Transportation Chain Elements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hubs.map((h, i) => {
                  const Icon = HubIconsMap[h.type];
                  const Icon2 =
                    shipments.length > i
                      ? FreightCategoryIcons[shipments[i].category]
                      : undefined;
                  return (
                    <>
                      <div
                        className="flex gap-2 items-center p-2 bg-secondary text-muted-foreground rounded my-2"
                        key={h.name}
                      >
                        <p>{i + 1}.</p>
                        <Icon size={16} />
                        <p className="max-w-[150px] line-clamp-1">{h.name}</p>
                      </div>
                      {Icon2 && (
                        <div className="flex gap-4">
                          <ArrowDown className="text-muted-foreground" />
                          <Icon2 />
                        </div>
                      )}
                    </>
                  );
                })}
                {show ? (
                  <HubForm
                    hubs={hubs}
                    setShipments={setShipments}
                    getFreightCategories={getFreightCategories}
                    setHubs={setHubs}
                    setShow={setShow}
                    showFreight={hubs.length !== 0}
                  />
                ) : (
                  <div className="flex items-center gap-2 justify-end mt-2">
                    <Button onClick={() => setShow(true)} className="">
                      <Plus size={16} className="mr-2" />
                      Add
                    </Button>
                    <Button
                      onClick={() => setShowDialog(true)}
                      variant="outline"
                      disabled={shipments.length === 0}
                    >
                      <Check size={16} className="mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ReactFlowProvider>
        <TCEFlow hubs={hubs} shipments={shipments} />
      </ReactFlowProvider>
    </div>
  );
}
