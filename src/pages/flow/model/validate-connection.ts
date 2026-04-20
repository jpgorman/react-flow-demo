import type { Connection, Edge } from "@xyflow/react";
import type { CustomNode } from "./node.types";

export const validateConnection = (
  { source, target, sourceHandle, targetHandle }: Connection,
  nodes: Array<CustomNode>,
  edges: Array<Edge>
) => {
  const sourceNode = nodes.find(({ id }) => id === source);
  const targetNode = nodes.find(({ id }) => id === target);

  if (!targetNode || !sourceNode) {
    return false;
  }

  const output = sourceNode.data.outputs[sourceHandle] ?? null;

  const input =
    "inputs" in targetNode.data ? targetNode.data.inputs[targetHandle] : null;

  if (!output || !input) {
    return false;
  }

  // Limit input connections to 1
  // We could add maxConnections as a property on HandleParam
  // then we can count the number of matching connections and assert when they reach maxConnections
  const alreadyConnected = edges.some(
    (e) => e.target === target && e.targetHandle === targetHandle
  );

  if (alreadyConnected) {
    return false;
  }

  return (
    output.type === input.type || output.type === "Any" || input.type === "Any"
  );
};
