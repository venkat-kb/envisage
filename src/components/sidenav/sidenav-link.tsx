import { Home, LucideProps } from "lucide-react";
import Link from "next/link";
import React from "react";

const SidenavLink: React.FC<{
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
}> = ({ Icon, label, href }) => (
  <div className="flex items-center gap-2">
    <Link
      href={href}
      className="flex items-center gap-2 justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground "
      prefetch={false}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
    </Link>
  </div>
);

export default SidenavLink;
