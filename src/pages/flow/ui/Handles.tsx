import { memo } from "react";
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import type { NodeConnection } from "../model/node.types";
import type { CSSProps } from "../model/css.types";

type Props = {
  connections: NodeConnection;
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
    border: "1px solid black",
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

const Handles = memo(({ type, connections }: Props) => {
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

export const InputHandles = (props: HandleProps) => {
  return <Handles {...props} type="target" />;
};

export const OutputHandles = (props: HandleProps) => {
  return <Handles {...props} type="source" />;
};
