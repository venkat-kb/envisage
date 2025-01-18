"use client";
import ReactFlow, {
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "reactflow";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FreightCategoryIcons } from "@/data/freight-categories";
import { Sheet } from "@/components/ui/sheet";
import { HubIconsMap } from "@/data/tce";
import TCESheetView from "../transportation-chain/views/tce-sheet-view";
import { ShipmentData } from "@/types/freight-data";
import { ICheckpoint } from "@/lib/validators/tce/checkpoint-validator";
import DefaultNode from "./default-node";
import CustomEdge from "./custom-edge";

const nodeTypes = {
  defaultNode: DefaultNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};
const TCEFlow: React.FC<{
  hubs: ICheckpoint[];
  shipments: ShipmentData[];
}> = ({ hubs, shipments }) => {
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []);
  const nodeTypes = useMemo(() => ({ defaultNode: DefaultNode }), []);
  const [open, setOpen] = useState(false);
  const [hubID, setHubID] = useState(-1);
  const [nodes, setNodes] = useState<Node<any>[]>([]);
  const [edges, setEdges] = useState<Edge<any>[]>([]);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const { fitView } = useReactFlow();

  useEffect(() => {
    setNodes(
      hubs.map((hub, index) => ({
        id: index.toString(),
        data: {
          label: "ANY",
          icon: HubIconsMap.Airport,
          address: hub.location,
          last: index === hubs.length - 1,
          first: index === 0,
        },
        position: { x: 0, y: 200 * index },
        type: "defaultNode",
      }))
    );

    setEdges(
      shipments.map((shipment, index) => ({
        id: `${index}-${index + 1}`,
        source: index.toString(),
        target: (index + 1).toString(),
        type: "customEdge",
        data: {
          mode: shipment.category,
          distance: shipment.distance.toFixed(0) + " KM",
          emission: shipment.co2e,
          onOpen: () => {
            setOpen(true);
            setHubID(index);
          },

          icon: FreightCategoryIcons[shipment.category],
        },
      }))
    );

    setTimeout(() => fitView({ duration: 500 }), 500);
  }, [hubs, shipments]);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {hubID !== -1 && <TCESheetView {...shipments[hubID]} />}
      </Sheet>{" "}
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        className="backdrop-blur-sm border rounded shadow-lg h-[90vh] w-[50vw]"
        style={{ maxWidth: "50%", height: "100%", minHeight: "80vh" }}
        // @ts-ignore
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <p className="w-full text-center pt-2 z-[5000] font-semibold text-muted-foreground/80">
          Transportation Chain
        </p>
        {/* <Background /> */}
        <Controls />
      </ReactFlow>
    </>
  );
};

export default TCEFlow;
