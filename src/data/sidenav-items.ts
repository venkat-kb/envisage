import {
  Bot,
  Home,
  LucideProps,
  Package,
  PencilRuler,
  PlaneTakeoff,
  Plus,
  Route,
  Ship,
  Train,
  Truck,
  Users,
} from "lucide-react";

export type Icon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;
const SidenavItems: {
  Icon: Icon;
  label: string;
  href: string;
}[] = [
  {
    Icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    Icon: Plus,
    label: "New Shipment",
    href: "/dashboard/shipment/new",
  },
  {
    Icon: Truck,
    label: "Your Shipments",
    href: "/dashboard/shipment",
  },
  {
    Icon: PencilRuler,
    label: "Compare",
    href: "/dashboard/compare",
  },
  {
    Icon: Package,
    label: "Bulk Upload",
    href: "/dashboard/bulk-upload",
  },
  {
    Icon: Route,
    label: "TCE",
    href: "/dashboard/transport-chain-latest",
  },
  {
    Icon: Bot,
    label: "Chat",
    href: "/dashboard/chat/new",
  },
];

export default SidenavItems;

export const AdminSidenavItems: {
  Icon: Icon;
  label: string;
  href: string;
}[] = [
  {
    Icon: Home,
    label: "Home",
    href: "/admin",
  },
  {
    Icon: Users,
    label: "Users",
    href: "/admin/users",
  },
  {
    Icon: Truck,
    label: "Road Emissions",
    href: "/admin/road-emissions",
  },
  {
    Icon: Ship,
    label: "Water Emissions",
    href: "/admin/ship-emissions",
  },
  {
    Icon: Train,
    label: "Rail Emissions",
    href: "/admin/rail-emissions",
  },
  {
    Icon: PlaneTakeoff,
    label: "Air Emissions",
    href: "/admin/air-emissions",
  },
];
