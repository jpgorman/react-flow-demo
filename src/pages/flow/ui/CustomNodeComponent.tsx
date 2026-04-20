import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import type { NodeData } from "../model/node.types";
import { InputHandles, OutputHandles } from "./Handles";
import type { CSSProps } from "../model/css.types";

const styles = {
  title: {
    padding: 4,
  },
  container: {
    minWidth: 100,
    color: "black",
    fontSize: 12,
    background: "white",
    padding: 0,
  },
  handles: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    background: "darkgray",
    paddingTop: 4,
    paddingBottom: 4,
  },
  DataSource: { backgroundColor: "#6ede87", color: "white" },
  Model: { backgroundColor: "#ff0072", color: "white" },
  Transform: { backgroundColor: "#6865A5", color: "white" },
} satisfies CSSProps;

export type CustomNodeComponentProps = Omit<NodeProps, "data"> & {
  data: NodeData;
};

export const CustomNodeComponent = memo(
  ({ data, type }: CustomNodeComponentProps) => {
    return (
      <div style={{ ...styles.container }}>
        <div style={{ ...styles.title, ...styles[type] }}>
          <strong>{data.label}</strong>
        </div>
        <div style={styles.handles}>
          {"inputs" in data && <InputHandles connections={data.inputs} />}
          <OutputHandles connections={data.outputs} />
        </div>
      </div>
    );
  }
);
