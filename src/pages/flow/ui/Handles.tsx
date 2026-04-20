import { memo, type CSSProperties } from "react";
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import type { NodeConnection } from "../model/node.types";
import type { CSSProps } from "../model/css.types";

type Props = {
  connections: NodeConnection;
  isConnectable: boolean;
  type: "source" | "target";
};

const styles = {
  handle: {
    position: "relative",
    fontSize: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "white",
    borderRadius: 2,
    border: "1px solid black"
  },
  input: {
    textAlign: "left",
    marginRight: 4,
    marginLeft: -4,
  },
  output: {
    marginLeft: 4,
    marginRight: -4,
    textAlign: "right",
  },
  connectables: {
    target: {
      left: 0,
    },
    source: {
      right: 0,
    },
  },
} satisfies CSSProps;

const Handles = memo(({ type, connections, isConnectable }: Props) => {
  if (!connections) {
    return null;
  }

  return Object.entries(connections).map(([id, params]) => (
    <div
      key={id}
      style={{
        ...styles.handle,
        ...(type === "source" ? styles.output : styles.input),
      }}
    >
      <Handle
        isConnectable={isConnectable}
        id={id}
        type={type}
        position={type === "source" ? Position.Right : Position.Left}
        style={
          type === "source"
            ? styles.connectables.source
            : styles.connectables.target
        }
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
