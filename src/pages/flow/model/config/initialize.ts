import type { Edge } from "@xyflow/react";
import { createNode, getNextPosition } from "../logic";
import type { CustomNode } from "../typing";

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
