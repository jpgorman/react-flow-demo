import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { CustomNode, CustomNodeType } from "./model/node.types";
import { CustomNodeComponent, CreateNodes } from "./ui";
import { validateConnection } from "./model/validate-connection";
import { createNode } from "./model/create-node";

const dataSourceNode = createNode({
  type: "DataSource",
  position: { x: 0, y: 0 },
});

const transformNode = createNode({
  type: "Transform",
  position: { x: 0, y: 100 },
});

const modelNode = createNode({ type: "Model", position: { x: 0, y: 200 } });

const initialNodes: Array<CustomNode> = [
  dataSourceNode,
  transformNode,
  modelNode,
];

const initialEdges: Array<Edge> = [
  { id: "n1-n2", source: dataSourceNode.id, target: transformNode.id },
  { id: "n2-n3", source: transformNode.id, target: modelNode.id },
];

const nodeTypes = {
  DataSource: CustomNodeComponent,
  Transform: CustomNodeComponent,
  Model: CustomNodeComponent,
};

const styles = {
  container: { width: "100vw", height: "100vh" },
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

  const onAddNode = useCallback((type: CustomNodeType) => {
    const newNode: CustomNode = createNode({
      type,
      position: {
        x: 50,
        y: 50,
      },
    });
    console.log("click");
    setNodes((nds) => [...nds, newNode]);
  }, []);

  // TODO: Maybe a custom hook, but very simple
  const isValidConnection = useCallback(
    (connection: Connection) => validateConnection(connection, nodes),
    [nodes]
  );

  return (
    <div style={styles.container}>
      <ReactFlow
        isValidConnection={isValidConnection}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <CreateNodes onAddNode={onAddNode} />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
