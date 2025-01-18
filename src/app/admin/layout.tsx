import Breadcrumbs from "@/components/breadcrumb";
import { AdminSidenav } from "@/components/sidenav/admin-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminSidenav />
      <div className="flex flex-col pl-[6rem] pr-8 py-4 gap-4">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
