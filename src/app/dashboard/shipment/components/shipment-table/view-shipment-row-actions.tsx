"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import {
  Delete,
  Ellipsis,
  Pencil,
  RefreshCcw,
  Sheet as SheetIcon,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import ViewShipmentSheet from "../view-shipment-sheets/view-shipment-sheet";
import {
  AirMethods,
  FreightCategoryMethods,
  FreightMethods,
  RailwayMethods,
  RoadMethods,
  WaterMethods,
} from "@/types/freight-types";
import { useRouter } from "next/navigation";
import { Shipment } from "@prisma/client";

const editLink = (method: FreightMethods, id: string) => {
  switch (method) {
    case RailwayMethods.Standard:
      return `/dashboard/shipment/new/standard-rail?id=${id}&editing=true`;
    case AirMethods.INTERNATIONAL:
      return `/dashboard/shipment/new/international?id=${id}&editing=true`;
    case AirMethods.DOMESTIC:
      return `/dashboard/shipment/new/domestic?id=${id}&editing=true`;
    case WaterMethods.COASTAL:
      return `/dashboard/shipment/new/coastal?id=${id}&editing=true`;
    case WaterMethods.INTERNATIONAL_WATER:
      return `/dashboard/shipment/new/international-water?id=${id}&editing=true`;
    case RoadMethods.PointToPoint:
      return `/dashboard/shipment/new/point-to-point?id=${id}&editing=true`;
    case RoadMethods.COURIER:
      return `/dashboard/shipment/new/courier?id=${id}&editing=true`;
    default:
      return "/dashboard/shipment/new/";
  }
};

const recreateLink = (method: FreightMethods, id: string) => {
  switch (method) {
    case RailwayMethods.Standard:
      return `/dashboard/shipment/new/standard-rail?id=${id}&recreating=true`;
    case AirMethods.INTERNATIONAL:
      return `/dashboard/shipment/new/international?id=${id}&recreating=true
      `;
    case AirMethods.DOMESTIC:
      return `/dashboard/shipment/new/domestic?id=${id}&recreating=true`;
    case WaterMethods.COASTAL:
      return `/dashboard/shipment/new/coastal?id=${id}&recreating=true`;
    case WaterMethods.INTERNATIONAL_WATER:
      return `/dashboard/shipment/new/international-water?id=${id}&recreating=true`;
    case RoadMethods.PointToPoint:
      return `/dashboard/shipment/new/point-to-point/point-to-point?id=${id}&recreating=true`;
    case RoadMethods.COURIER:
      return `/dashboard/shipment/new/courier?id=${id}&recreating=true`;
    default:
      return "/dashboard/shipment/new/";
  }
};
interface DataTableRowActionsProps<TData extends Shipment> {
  row: Row<TData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setID: Dispatch<SetStateAction<number>>;
  setDeleteID: Dispatch<SetStateAction<string>>;
}

export function ViewShimentRowActions({
  row,
  setID,
  setOpen,
  setDeleteID,
}: DataTableRowActionsProps<Shipment>) {
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
              setID(row.index);
            }}
          >
            View <SheetIcon className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const link = editLink(
                row.original.method as FreightMethods,
                row.original.id
              );
              router.push(link);
            }}
          >
            Edit <Pencil className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const link = recreateLink(
                row.original.method as FreightMethods,
                row.original.id
              );
              router.push(link);
            }}
          >
            Recreate <RefreshCcw className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteID(row.original.id)}>
            Delete <Delete className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
