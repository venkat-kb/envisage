import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Home, Settings } from "lucide-react";
import Image from "next/image";
import SidenavLink from "./sidenav-link";
import SidenavItems from "../../data/sidenav-items";

export default function Sidenav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden  max-h-[100vh] flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col  gap-4 px-4 sm:py-5 ">
        <Link
          href="#"
          className="group flex mb-4 items-center justify-center gap-2 rounded-full  text-lg font-semibold text-primary-foreground  md:text-base"
          prefetch={false}
        >
          <Image
            src="/assets/logo.svg"
            height="20"
            width="40"
            alt="TEMT Logo"
          />
          {/* <span className="sr-only">Acme Inc</span> */}
        </Link>
        {SidenavItems.map((item) => (
          <SidenavLink key={item.href} {...item} />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

// <header
//         id="head"
//         className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
//       >
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button size="icon" variant="outline" className="sm:hidden">
//               <PanelLeftIcon className="h-5 w-5" />
//               <span className="sr-only">Toggle Menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="sm:max-w-xs">
//             <nav className="grid gap-6 text-lg font-medium">
//               <Link
//                 href="#"
//                 className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
//                 prefetch={false}
//               >
//                 <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
//                 <span className="sr-only">Acme Inc</span>
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 prefetch={false}
//               >
//                 <HomeIcon className="h-5 w-5" />
//                 Dashboard
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-4 px-2.5 text-foreground"
//                 prefetch={false}
//               >
//                 <ShoppingCartIcon className="h-5 w-5" />
//                 Orders
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 prefetch={false}
//               >
//                 <PackageIcon className="h-5 w-5" />
//                 Products
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 prefetch={false}
//               >
//                 <UsersIcon className="h-5 w-5" />
//                 Customers
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 prefetch={false}
//               >
//                 <LineChartIcon className="h-5 w-5" />
//                 Settings
//               </Link>
//             </nav>
//           </SheetContent>
//         </Sheet>
//         <Breadcrumbs />

//         <div className="relative ml-auto flex-1 md:grow-0">
//           <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
//           />
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="outline"
//               size="icon"
//               className="overflow-hidden rounded-full"
//             >
//               <User />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem>Support</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Logout</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </header>
