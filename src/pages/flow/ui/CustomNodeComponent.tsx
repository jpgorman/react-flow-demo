import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import type { NodeData } from "../model/node.types";
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

// TODO: Add styling for each node type
// style: { backgroundColor: '#6ede87', color: 'white' },
// style: { backgroundColor: '#ff0072', color: 'white' },
// style: { backgroundColor: '#6865A5', color: 'white' },

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
