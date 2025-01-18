"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "../../../../components/ui/button";
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
} from "../../../../components/ui/dropdown-menu";
import {
  Delete,
  Ellipsis,
  Pencil,
  RefreshCcw,
  Sheet as SheetIcon,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setID: Dispatch<SetStateAction<number>>;
}

export function DataTableRowActions<TData>({
  row,
  setID,
  setOpen,
}: DataTableRowActionsProps<TData>) {
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
          <DropdownMenuItem>
            Edit <Pencil className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Recreate <RefreshCcw className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete <Delete className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
