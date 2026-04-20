import { type Node } from "@xyflow/react";

export type CustomNodeType = "DataSource" | "Transform" | "Model";

// Use discriminated union to ensure which nodeTypes
// have inputs and which have outputs only
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

export type HandleParam = {
  type: DataType;
  label: string;
};

export type DataType = "Dataset" | "Model" | "Any";
