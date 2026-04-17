import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { NodeConnection, NodeData } from "../model/Node.types";

type Props = {
  connections?: NodeConnection;
  isConnectable: boolean;
  type: "source" | "target";
};

const styles = {
  container: {
    fontSize: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
};

// TODO too generic? Split into input and output handles
export const Handles = memo(({ type, connections, isConnectable }: Props) => {
  if (!connections) {
    return null;
  }

  const position = type === "source" ? Position.Bottom : Position.Top;
  return Object.entries(connections).map(([id, params], index) => (
    <div key={id} style={styles.container}>
      <Handle
        isConnectable={isConnectable}
        id={id}
        type={type}
        position={position}
        onConnect={(params) => console.log("handle onConnect", params)}
        style={{
          // TODO: improve positioning
          left: 40 + index * 30,
        }}
      />
      <span>{params.label}</span>
    </div>
  ));
});
