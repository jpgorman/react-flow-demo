import { memo, type CSSProperties } from "react";
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import type { NodeConnection } from "../model/node.types";

type Props = {
  connections: NodeConnection;
  isConnectable: boolean;
  type: "source" | "target";
};

type CSSProps = Record<string, CSSProperties | Record<string, CSSProperties>>;

const styles = {
  container: {
    display: "inline-flex",
    gap: 4,
  },
  handle: {
    position: "relative",
    fontSize: 10,
    padding: 4,
    borderRadius: 8,
    border: "1px solid white",
  },
  connectables: {
    target: {
      top: -12,
    },
    source: {
      bottom: -12,
    },
  },
} satisfies CSSProps;

const Handles = memo(({ type, connections, isConnectable }: Props) => {
  if (!connections) {
    return null;
  }

  return (
    <div style={styles.container}>
      {Object.entries(connections).map(([id, params]) => (
        <div key={id} style={styles.handle}>
          <Handle
            isConnectable={isConnectable}
            id={id}
            type={type}
            position={type === "source" ? Position.Bottom : Position.Top}
            style={
              type === "source"
                ? styles.connectables.source
                : styles.connectables.target
            }
          />
          <span>{params.label}</span>
        </div>
      ))}
    </div>
  );
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
