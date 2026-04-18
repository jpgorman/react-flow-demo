import { memo } from "react";
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import type { NodeConnection } from "../model/Node.types";

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

const Handles = memo(({ type, connections, isConnectable }: Props) => {
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

export const InputHandles = (props: Pick<Props, "connections">) => {
  const handleType = "target";
  const nodeConnections = useNodeConnections({
    handleType,
  });
  const isConnectable = nodeConnections.length < 1;

  return <Handles {...props} type={handleType} isConnectable={isConnectable} />;
};

export const OutputHandles = (props: Pick<Props, "connections">) => {
  const handleType = "source";

  return <Handles {...props} type={handleType} isConnectable={true} />;
};
