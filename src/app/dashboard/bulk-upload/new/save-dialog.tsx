import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const BulkSaveDialog: React.FC<{
  open: boolean;
  setOpen: (x: boolean) => void;
  onSave: () => Promise<void>;
  rows: number;
  setRef: (x: string) => void;
  refID: string;
}> = ({ open, setOpen, onSave, rows, setRef, refID }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast().toast;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="min-w-max max-h-[80vh] overflow-auto min-h-max flex justify-normal flex-col"
        id="bulk-table"
      >
        <DialogHeader className="">
          <DialogTitle>Bulk Data</DialogTitle>
          <DialogDescription>Processed {rows} row(s) </DialogDescription>
        </DialogHeader>
        <Label>Reference ID</Label>
        <Input onChange={(e) => setRef(e.target.value)} />
        <DialogFooter>
          <Button
            onClick={() => {
              setLoading(true);
              onSave().then(() => {
                setLoading(false);
                setOpen(false);
              });
            }}
            disabled={loading || rows === 0 || refID.length === 0}
          >
            Confirm & Save{" "}
            {loading && <Icons.spinner className="h-3 w-3 animate-spin ml-2" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkSaveDialog;
