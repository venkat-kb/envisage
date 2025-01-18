// @ts-nocheck
"use client";

import KgOrTonneCo2e from "@/components/text/kg-or-tonne-co2e";
import { ArrowRight, Truck } from "lucide-react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeTypes,
  getStraightPath,
} from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const { emission, distance, mode, icon: Icon } = data;
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          className="flex flex-col border p-2 rounded bg-gradient-to-tr from-slate-100 to-slate-200 z-[500]"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <div
            className=" z-[1000] right-[-2.5rem] hover:bg-secondary top-[30%] text-[0.4rem] flex border items-center justify-center bg-white rounded-lg p-1"
            id="bruh"
            style={{
              position: "absolute",
              //   transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "all",
            }}
            onClick={() => {
              data.onOpen();
            }}
          >
            View <ArrowRight className="h-2 w-2" />
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-[0.5rem]">Mode</p>
            <span className="text-[0.5rem] font-semibold flex gap-1 items-center">
              {mode} <Icon className="h-2 w-2" />
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-[0.5rem]">Distance</p>
            <span className="text-[0.5rem] font-semibold">{distance}</span>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-[0.5rem]">Emission </p>
            <KgOrTonneCo2e val={emission} className="text-[0.5rem]" />
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
