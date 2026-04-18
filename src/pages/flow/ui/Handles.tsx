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

type HandleProps = Pick<Props, "connections">;

const INPUT_CONNECTION_LIMIT = 1;
const INPUT_HANDLE_TYPE = "target";

export const InputHandles = (props: HandleProps) => {
  const nodeConnections = useNodeConnections({
    handleType: INPUT_HANDLE_TYPE,
  });
  const isConnectable = nodeConnections.length < INPUT_CONNECTION_LIMIT;

  return (
    <Handles
      {...props}
      type={INPUT_HANDLE_TYPE}
      isConnectable={isConnectable}
    />
  );
};

const OUPUT_HANDLE_TYPE = "source";

export const OutputHandles = (props: HandleProps) => {
  return <Handles {...props} type={OUPUT_HANDLE_TYPE} isConnectable={true} />;
};
