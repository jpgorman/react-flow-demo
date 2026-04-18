import { Panel } from "@xyflow/react";
import { memo } from "react";
import type { CustomNodeType } from "../model/node.types";

const styles = {
  container: {
    color: "#777",
    fontSize: 12,
  },
  button: {
    fontSize: 12,
    marginRight: 5,
    marginTop: 5,
  },
};

type Props = {
  onAddNode: (type: CustomNodeType) => void;
};

export const CreateNodes = memo(({ onAddNode }: Props) => {
  return (
    <Panel position="top-left" style={styles.container}>
      <div>
        <button
          onClick={() => onAddNode("DataSource")}
          className="xy-theme__button"
          style={styles.button}
        >
          Add DataSource
        </button>
        <button
          onClick={() => onAddNode("Transform")}
          className="xy-theme__button"
          style={styles.button}
        >
          Add Transform
        </button>
        <button
          onClick={() => onAddNode("Model")}
          className="xy-theme__button"
          style={styles.button}
        >
          Add Model
        </button>
      </div>
    </Panel>
  );
});
