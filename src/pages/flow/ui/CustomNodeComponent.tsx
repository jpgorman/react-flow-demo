import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import type { NodeData } from "../model/node.types";
import { InputHandles, OutputHandles } from "./Handles";

const styles = {
  container: {
    color: "black",
    fontSize: 12,
    background: "white",
    padding: 10,
  },
  DataSource: { backgroundColor: "#6ede87", color: "white" },
  Model: { backgroundColor: "#ff0072", color: "white" },
  Transform: { backgroundColor: "#6865A5", color: "white" },
};

export const CustomNodeComponent = memo(
  ({ data, type }: NodeProps & { data: NodeData }) => {
    return (
      <div style={{ ...styles.container, ...styles[type] }}>
        <InputHandles connections={data.inputs} />
        <div>
          <strong>{data.label}</strong>
        </div>
        <OutputHandles connections={data.outputs} />
      </div>
    );
  }
);
