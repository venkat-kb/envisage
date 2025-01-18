"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { deleteShipment } from "../new/api/create-shipment";
import { useToast } from "@/components/ui/use-toast";

const ConfirmDelete: React.FC<{ id: string; reset: () => void }> = ({
  id,
  reset,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast().toast;
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (id.length > 0) {
      setOpen(true);
    }
  }, [id]);
  const onDelete = () => {
    setOpen(true);
    setLoading(true);
    deleteShipment(id)
      .then(() =>
        toast({
          title: "Shipment Deleted",
          description: "Your shipment has been deleted successfully",
        })
      )
      .catch(() =>
        toast({
          title: "Whoops!",
          description: "Failed to delete shipment",
          variant: "destructive",
        })
      )
      .finally(() => {
        startTransition(() => {
          router.refresh();
        });

        setLoading(false);
        setOpen(false);
      });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            shipment and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={reset}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={loading}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
