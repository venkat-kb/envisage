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
import StartNode from "./_flow/start-node";
import DefaultNode from "./_flow/default-node";
import CustomEdge from "./_flow/custom-edge";
import { useCallback, useEffect, useState } from "react";
import { Hubs } from "@/types/hub-location-types";
import { ShipmentDataTCE } from "./useTransportChain";
import { FreightCategoryIcons } from "@/data/freight-categories";
import { Sheet } from "@/components/ui/sheet";
import TCESheetView from "./views/tce-sheet-view";
import { HubIconsMap } from "@/data/tce";

const nodeTypes = {
  startNode: StartNode,
  defaultNode: DefaultNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};
const TCEFlow: React.FC<{
  hubs: Hubs[];
  shipments: ShipmentDataTCE[];
}> = ({ hubs, shipments }) => {
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
          label: hub.type,
          icon: HubIconsMap[hub.type],
          address: hub.name,
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
        className="backdrop-blur-sm border rounded shadow-lg"
        style={{ maxWidth: "50%", height: "100%" }}
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
