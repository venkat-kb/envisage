"use client";
import LabelledFormInput from "@/components/form/labelled-form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { RoadVehicle } from "@prisma/client";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  IRoadEmission,
  roadEmissionValidator,
} from "@/lib/validators/emission/road";
import { updateRoadEmission } from "../road-emissions/api";
import { zodResolver } from "@hookform/resolvers/zod";

const UpdateRoadEmissionDialog: React.FC<{
  open: boolean;
  setOpen: (x: boolean) => void;
  emission: RoadVehicle;
}> = ({ open, setOpen, emission }) => {
  const form = useForm<IRoadEmission>({
    resolver: zodResolver(roadEmissionValidator),
    defaultValues: {
      capacity: emission.capacity,

      fuel: emission.fuel,
      ttw: emission.ttw,
      type: emission.type,
      wtt: emission.wtt,
    },
  });
  const toast = useToast().toast;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: IRoadEmission) => {
    setLoading(true);
    updateRoadEmission(emission.id, data)
      .then((res) => {
        if (res) {
          toast({
            title: "Success!",
            description: "Emission has been updated successfully",
          });
          startTransition(() => {
            router.refresh();
            setOpen(false);
          });
        } else {
          toast({
            title: "Whoops!",
            description: "Failed to update emission",
            variant: "destructive",
          });
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-max max-h-[80vh] overflow-auto min-h-max flex justify-normal flex-col">
        <DialogHeader className="sticky top-0 backdrop-blur-sm  z-[1000] mr-4">
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Edit User Details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <LabelledFormInput
              control={form.control}
              label="Type"
              isDisabled
              name="type"
              placeholder="John Doe"
            />
            <LabelledFormInput
              control={form.control}
              label="Fuel"
              name="fuel"
              isDisabled
              placeholder="Diesel"
            />
            <LabelledFormInput
              control={form.control}
              label="Well To Tank (KG)"
              name="wtt"
              placeholder=""
            />
            <LabelledFormInput
              control={form.control}
              label="Tank To Wheel (KG)"
              name="ttw"
              placeholder=""
            />
            <LabelledFormInput
              control={form.control}
              label="Capacity in MT"
              name="capacity"
              placeholder=""
            />

            <Button type="submit" disabled={loading}>
              {loading && (
                <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoadEmissionDialog;
