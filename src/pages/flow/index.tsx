import { useState, useCallback, type FunctionComponent } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Connection,
  type OnConnectEnd,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import toast, { Toaster } from "react-hot-toast";
import {
  CustomNodeComponent,
  CreateNodes,
  type CustomNodeComponentProps,
} from "./ui";
import type { CustomNode, CustomNodeType } from "./model";
import {
  validateConnection,
  createNode,
  getNextPosition,
  initialize,
} from "./model";
import { Toast } from "./ui/Toast";

const nodeTypes: Record<
  CustomNodeType,
  FunctionComponent<CustomNodeComponentProps>
> = {
  DataSource: CustomNodeComponent,
  Transform: CustomNodeComponent,
  Model: CustomNodeComponent,
};

const INVALID_CONNECTION_MSG = "This connection isn't valid";

export default function Flow() {
  const [nodes, setNodes] = useState(initialize.nodes);
  const [edges, setEdges] = useState(initialize.edges);
  const [error, setError] = useState<string | null>(null);

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
      setError(INVALID_CONNECTION_MSG);
    }
  };

  const onCloseToast = useCallback(() => {
    setError(null);
  }, [error]);

  const onAddNode = useCallback(
    (type: CustomNodeType) => {
      setNodes((nds) => [
        ...nds,
        createNode({
          type,
          position: getNextPosition(nodes),
        }),
      ]);
    },
    [nodes]
  );

  const isValidConnection = useCallback(
    (connection: Connection) => validateConnection(connection, nodes, edges),
    [nodes, edges]
  );

  return (
    <>
      {error && <Toast onClose={onCloseToast}>{error}</Toast>}
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
    </>
  );
}
