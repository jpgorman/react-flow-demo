import { type Node } from "@xyflow/react";

export type NodeData = {
  label: string;
  inputs?: NodeConnection;
  outputs: NodeConnection;
  nodeType: "DataSource" | "Transform" | "Model";
};

export type NodeConnection = Record<string, HandleParam>;

export type CustomNode = Node<NodeData>;

type HandleParam = {
  type: DataType;
  label: string;
};

type DataType = "Dataset" | "Model" | "Any";
