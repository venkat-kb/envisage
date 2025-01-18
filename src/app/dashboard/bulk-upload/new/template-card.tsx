import { FreightMethodsBulkUploadMap } from "@/data/bulk-upload";
import { FreightCategoryIcons } from "@/data/freight-categories";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FreightCategories } from "@/types/freight-types";
import { Download, Sheet } from "lucide-react";
import Link from "next/link";

export default function TemplateCard() {
  return (
    <Card className="w-full">
      <CardHeader className="bg-secondary h-[7rem]">
        <CardTitle className="text-lg flex items-center gap-4">
          <Sheet className="text-base" />
          Bulk Templates
        </CardTitle>
        <CardDescription>
          Download a template excel file containing the emissions data for a
          particular freight mode, to use it as a reference for bulk upload.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
      {Object.entries(FreightMethodsBulkUploadMap).map(
          ([category, methods]) => {
            const Icon = FreightCategoryIcons[category as FreightCategories];
            return (
              <div key={category}>
                <p className="text-base flex gap-2 items-center pb-2">
                  <Icon className="h-4 w-4" /> {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {methods.map(({ label, sheet }) => (
                    <Link
                      href={"/sheets/" + sheet}
                      key={label}
                      className="bg-secondary-foreground max-w-max  text-secondary flex justify-between items-center p-2 rounded"
                    >
                      {label}{" "}
                      <Download className="h-4 w-4 animate-pulse ml-2 " />
                    </Link>
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            );
          }
        )}
      </CardContent>
    </Card>
  );
}
