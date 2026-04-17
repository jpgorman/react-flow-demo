import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { NodeConnection, NodeData } from "../model/Node.types";

type Props = {
  connections?: NodeConnection;
  isConnectable: boolean;
  type: "source" | "target";
};

export const Handles = memo(({ type, connections, isConnectable }: Props) => {
  const position = type === "source" ? Position.Bottom : Position.Top;
  if (!connections) {
    return null;
  }
  return Object.entries(connections).map(([id, params]) => (
    <div key={id}>
      <Handle
        isConnectable={isConnectable}
        id={id}
        type={type}
        position={position}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <span>{params.label}</span>
    </div>
  ));
});
