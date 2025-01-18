import Breadcrumbs from "@/components/breadcrumb";
import Sidenav from "@/components/sidenav";
// import { Sidebar3 } from "@/components/sidenav/sidenav-2";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./auth-provider";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import DockDemo from "@/components/sidenav/sidenav-2";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* <Sidebar3 /> */}
      <DockDemo />
      <div className="flex flex-col gap-4 h-full min-h-screen h-full">
        <Breadcrumbs />
        <div className="py-4 px-8 flex flex-col gap-4 h-full">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </div>
    </div>
  );
}


// export default function InteractiveGridPatternDemo() {
//   return (
//     <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
//       <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
//         Interactive Grid Pattern
//       </p>
//       <InteractiveGridPattern
//         className={cn(
//           "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
//           "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
//         )}
//       />
//     </div>
//   );
// }

/* HTML: <div class="loader"></div> */
