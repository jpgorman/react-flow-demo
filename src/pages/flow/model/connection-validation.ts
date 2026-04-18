import type { Connection, Edge, IsValidConnection } from "@xyflow/react";
import type { CustomNode } from "./Node.types";

export const validateConnection = (
  { source, target, sourceHandle, targetHandle }: Connection,
  nodes: Array<CustomNode>
) => {
  const sourceNode = nodes.find(({ id }) => id === source);
  const targetNode = nodes.find(({ id }) => id === target);

  if (!targetNode || !sourceNode) {
    return false;
  }

  const output = sourceNode.data.outputs[sourceHandle] ?? null;

  const input = targetNode.data.inputs[targetHandle] ?? null;

  if (!output || !input) {
    return false;
  }

  return (
    output.type === input.type || output.type === "Any" || input.type === "Any"
  );
};
