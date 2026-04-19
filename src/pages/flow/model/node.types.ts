import { type Node } from "@xyflow/react";

export type CustomNodeType = "DataSource" | "Transform" | "Model";

// Use discriminated union to ensure which nodeTypes
// have inputs and which have only outputs
export type NodeData =
  | {
      label: string;
      inputs: NodeConnection;
      outputs: NodeConnection;
      nodeType: Extract<CustomNodeType, "Transform" | "Model">;
    }
  | {
      label: string;
      outputs: NodeConnection;
      nodeType: Extract<CustomNodeType, "DataSource">;
    };

export type NodeConnection = Record<string, HandleParam>;

export type CustomNode = Node<NodeData>;

type HandleParam = {
  type: DataType;
  label: string;
};

type DataType = "Dataset" | "Model" | "Any";
