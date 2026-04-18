import { type Node } from "@xyflow/react";

export type CustomNodeType = "DataSource" | "Transform" | "Model";

export type NodeData = {
  label: string;
  inputs?: NodeConnection;
  outputs: NodeConnection;
  nodeType: CustomNodeType;
};

export type NodeConnection = Record<string, HandleParam>;

export type CustomNode = Node<NodeData>;

type HandleParam = {
  type: DataType;
  label: string;
};

type DataType = "Dataset" | "Model" | "Any";
