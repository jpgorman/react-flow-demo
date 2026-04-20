import type { Edge } from "@xyflow/react";
import { createNode } from "./create-node";
import { getNextPosition } from "./get-next-position";
import type { CustomNode } from "./node.types";

const initialNodes: Array<CustomNode> = [];

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
    id: `${dataSourceNode.id}-${transformNode.id}`,
    source: dataSourceNode.id,
    sourceHandle: `${dataSourceNode.id}-output-a`,
    target: transformNode.id,
    targetHandle: `${transformNode.id}-input-a`,
  },
  {
    id: `${transformNode.id}-${modelNode.id}`,
    source: transformNode.id,
    sourceHandle: `${transformNode.id}-output-a`,
    target: modelNode.id,
    targetHandle: `${modelNode.id}-input-a`,
  },
];

export const initialize = {
  edges: initialEdges,
  nodes: initialNodes,
};
