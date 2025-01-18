"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { logoutAPI } from "@/app/login/api";

const PATH_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  shipment: "Shipment",
  "bulk-upload": "Bulk Upload",
  compare: "Compare",
  new: "New",
  "transportation-chain": "Transportation Chain",

  intercity: "Road - Intercity",
  intracity: "Road - Intracity",
  "non-containerized": "Rail - Non-Containerized",
  domestic: "Air - Domestic",
  international: "Air - International",

  "international-water": "Water - International",
  coastal: "Water - Coastal",
  admin: "Admin Dashboard",
  "road-emissions": "Road Emissions",
  "transport-chain-latest": "Transport Chain",
  pdf: "PDF",
  "standard-rail": "Rail - Standard",
};

export default function Breadcrumbs() {
  const fullPath = usePathname();
  const path = fullPath
    .split("/")
    .splice(1)
    .map((p) => PATH_MAP[p] ?? p);
  const router = useRouter();
  return (
    <div className="flex items-center bg-[transparent] px-12 border-b-[2px] backdrop-blur-sm h-14">
      <Breadcrumb className="hidden md:flex ">
        <BreadcrumbList>
          {path.map((item, i) => {
            const href =
              "/" +
              fullPath
                .split("/")
                .splice(1)
                .slice(0, i + 1)
                .join("/");
            return (
              <Fragment key={i}>
                <BreadcrumbItem key={i}>
                  {i !== path.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link href={href} prefetch={false}>
                        {item}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="font-semibold">
                      {item}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {i !== path.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full ml-auto max-h-max h-8 w-8 aspect-square"
          >
            <User size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logoutAPI().then(() => router.push("/login"));
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
