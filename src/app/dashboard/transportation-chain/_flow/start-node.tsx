"use client";
import { PlaneTakeoff } from "lucide-react";
import { Handle, Position } from "reactflow";

export default function StartNode({}) {
  return (
    <div className="border bg-white flex w-[170px] flex-col rounded-lg shadow-lg p-2">
      <Handle
        type="source"
        id="a"
        position={Position.Bottom}
        style={{ background: "#555" }}
        isConnectable
      />
      <p className="text-xs line-clamp-1 flex gap-2 items-center justify-center ">
        Origin Airport <PlaneTakeoff className="h-4 w-4" />{" "}
      </p>
      <p className="text-[0.5rem] text-muted-foreground text-center line-clamp-1">
        Indira Gandhi Airport
      </p>
    </div>
  );
}
