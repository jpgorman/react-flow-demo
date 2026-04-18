import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import type { NodeData } from "../model/Node.types";
import { InputHandles, OutputHandles } from "./Handles";

const styles = {
  container: {
    color: "black",
    fontSize: 12,
    borderRadius: 8,
    background: "white",
    padding: 10,
    border: "1px solid #ccc",
  },
};

export const CustomNodeComponent = memo(
  ({ data }: NodeProps & { data: NodeData }) => {
    return (
      <div style={styles.container}>
        <InputHandles connections={data.inputs} />
        <div>
          <strong>{data.label}</strong>
        </div>
        <OutputHandles connections={data.outputs} />
      </div>
    );
  }
);
