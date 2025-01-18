import { Icons } from "@/components/ui/icons";

export default function Loading() {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      {/* <Icons.spinner className="animate-spin h-8 w-8" /> */}
      <div className="loader"></div>
    </div>
  );
}

/* HTML: <div class="loader"></div> */
