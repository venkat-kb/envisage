import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICheckpoint } from "@/lib/validators/tce/checkpoint-validator";
import { FreightCategories } from "@/types/freight-types";
import { X } from "lucide-react";

const RenderCheckpoint: React.FC<{ data: ICheckpoint; remove: () => void }> = ({
  data,
  remove,
}) => (
  <div className="relative p-3 space-y-4 bg-slate-50 shadow">
    <div className="flex gap-4 ">
      <X
        className="h-6 w-6 absolute top-2 right-2 cursor-pointer"
        onClick={remove}
      />
      <div className="w-[300px] space-y-2">
        <Label>Category</Label>
        <Input
          disabled
          value={data.category}
          className="disabled:bg-white disabled:opacity-70"
        />
      </div>
      <div className="w-[300px] space-y-2">
        <Label>Location</Label>
        <Input
          disabled
          value={data.location}
          className="disabled:bg-white disabled:opacity-90 max-w-[300px] overflow-ellipsis"
        />
      </div>
    </div>
    {(data.category === FreightCategories.ROADWAYS ||
      data.category === FreightCategories.WATERWAYS) && (
      <div className="space-y-2">
        <Label>Vehicle Type</Label>
        <Input
          disabled
          className="max-w-[300px] overflow-ellipsisdisabled:bg-white disabled:opacity-70"
          value={
            data.category === FreightCategories.ROADWAYS
              ? data.vehicleType
              : data.type
          }
        />
      </div>
    )}
  </div>
);

export default RenderCheckpoint;
