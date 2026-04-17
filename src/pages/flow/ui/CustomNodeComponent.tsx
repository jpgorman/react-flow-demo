import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { NodeData } from "../model/Node.types";
import { Handles } from "./Handles";

export const CustomNodeComponent = memo(
  ({ data, isConnectable }: NodeProps & { data: NodeData }) => {
    return (
      <>
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
      </>
    );
  }
);
