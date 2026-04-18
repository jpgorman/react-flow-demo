import { Panel } from "@xyflow/react";
import { memo, useCallback } from "react";
import type { CustomNodeType } from "../model/Node.types";

const panelStyle = {
  color: "#777",
  fontSize: 12,
};

const buttonStyle = {
  fontSize: 12,
  marginRight: 5,
  marginTop: 5,
};

type Props = {
  onAddNode: (type: CustomNodeType) => void;
};

export const CreateNodes = memo(({ onAddNode }: Props) => {
  return (
    <Panel position="top-left" style={panelStyle}>
      <div>
        <button
          onClick={() => onAddNode("DataSource")}
          className="xy-theme__button"
          style={buttonStyle}
        >
          Add DataSource
        </button>
      </div>
    </Panel>
  );
});
