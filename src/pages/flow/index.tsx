import {
  useState,
  useCallback,
  type ReactElement,
  type FunctionComponent,
} from "react";
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
  type OnConnectEnd,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { CustomNode, CustomNodeType } from "./model/node.types";
import {
  CustomNodeComponent,
  CreateNodes,
  type CustomNodeComponentProps,
} from "./ui";
import { validateConnection } from "./model";
import { createNode, getNextPosition } from "./model";
import toast, { Toaster } from "react-hot-toast";

let initialNodes: Array<CustomNode> = [];

const dataSourceNode = createNode({
  type: "DataSource",
  position: getNextPosition(initialNodes),
});
initialNodes.push(dataSourceNode);

const transformNode = createNode({
  type: "Transform",
  position: getNextPosition(initialNodes),
});
initialNodes.push(transformNode);

const modelNode = createNode({
  type: "Model",
  position: getNextPosition(initialNodes),
});
initialNodes.push(modelNode);

const initialEdges: Array<Edge> = [
  {
    id: crypto.randomUUID(),
    source: dataSourceNode.id,
    target: transformNode.id,
  },
  {
    id: crypto.randomUUID(),
    source: transformNode.id,
    target: modelNode.id,
  },
];

const nodeTypes: Record<
  CustomNodeType,
  FunctionComponent<CustomNodeComponentProps>
> = {
  DataSource: CustomNodeComponent,
  Transform: CustomNodeComponent,
  Model: CustomNodeComponent,
};

const styles = {
  container: { width: "100vw", height: "100vh" },
};

const INVALID_CONNECTION_MSG = "This connection isn't valid";

export default function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes(
        (nodesSnapshot) =>
          applyNodeChanges(changes, nodesSnapshot) as Array<CustomNode>
      ),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot)),
    []
  );
  const onConnectEnd: OnConnectEnd = (_, state) => {
    if (!state.isValid) {
      toast.error(INVALID_CONNECTION_MSG);
    }
  };

  const onAddNode = useCallback(
    (type: CustomNodeType) => {
      const newNode: CustomNode = createNode({
        type,
        position: getNextPosition(nodes),
      });
      setNodes((nds) => [...nds, newNode]);
    },
    [nodes]
  );

  const isValidConnection = useCallback(
    (connection: Connection) => validateConnection(connection, nodes),
    [nodes]
  );

  return (
    <div style={styles.container}>
      <Toaster />
      <ReactFlow
        isValidConnection={isValidConnection}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
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
