import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { CustomNode } from "./model/Node.types";
import { CustomNodeComponent } from "./ui";

const initialNodes: Array<CustomNode> = [
  {
    id: "n1",
    type: "dataSource",
    position: { x: 0, y: 0 },
    data: {
      nodeType: "DataSource",
      label: "DataSource",
      outputs: {
        n1: {
          type: "Dataset",
          label: "Dataset",
        },
      },
    },
  },
  {
    id: "n2",
    type: "transform",
    position: { x: 0, y: 100 },
    data: {
      nodeType: "Transform",
      label: "Transform",
      inputs: {
        n2: {
          type: "Dataset",
          label: "Dataset",
        },
      },
      outputs: {
        n2: {
          type: "Dataset",
          label: "Dataset",
        },
      },
    },
  },
  {
    id: "n3",
    type: "model",
    position: { x: 0, y: 100 },
    data: {
      nodeType: "Model",
      label: "Model",
      inputs: {
        n3: {
          type: "Dataset",
          label: "Dataset",
        },
      },
      outputs: {
        n3: {
          type: "Model",
          label: "Model",
        },
      },
    },
  },
];
const initialEdges: Array<Edge> = [{ id: "n1-n2", source: "n1", target: "n2" }];

const nodeTypes = {
  dataSource: CustomNodeComponent,
  transform: CustomNodeComponent,
  model: CustomNodeComponent,
};

export default function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
