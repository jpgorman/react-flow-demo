import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { NodeData } from "../model/Node.types";
import { Handles } from "./Handles";

const styles = {
  container: {
    color: "black",
    fontSize: 12,
    borderRadius: 8,
    background: "white",
    padding: 10,
    border: "1px solid #ccc",
  },
};

export const CustomNodeComponent = memo(
  ({ data, isConnectable }: NodeProps & { data: NodeData }) => {
    return (
      <div style={styles.container}>
        <Handles
          type="target"
          connections={data.inputs}
          isConnectable={isConnectable}
        />
        <div>
          <strong>{data.label}</strong>
        </div>
        <Handles
          type="source"
          connections={data.outputs}
          isConnectable={isConnectable}
        />
      </div>
    );
  }
);
