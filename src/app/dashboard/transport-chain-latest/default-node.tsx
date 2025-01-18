// @ts-nocheck
"use client";
import { Handle, Position } from "reactflow";

export default function DefaultNode({ data }) {
  const Icon = data.icon;
  return (
    <div className="border bg-white flex w-[170px] flex-col rounded-lg shadow-lg p-2">
      {!data.first && (
        <Handle
          type="target"
          id="a"
          position={Position.Top}
          style={{ background: "#555" }}
          isConnectable
        />
      )}
      {/* <p className="text-xs line-clamp-1 flex gap-2 items-center justify-center ">
        {data.label} <Icon className="h-4 w-4" />
      </p> */}
      <p className="text-[0.5rem] text-muted-foreground text-center line-clamp-1">
        {data.address}
      </p>
      {!data.last && (
        <Handle
          type="source"
          id="b"
          position={Position.Bottom}
          style={{ background: "#555" }}
          isConnectable
        />
      )}
    </div>
  );
}
