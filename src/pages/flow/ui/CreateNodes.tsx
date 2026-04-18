import { Panel } from "@xyflow/react";
import {useCallback} from "react";

const panelStyle = {
  color: "#777",
  fontSize: 12,
};

const buttonStyle = {
  fontSize: 12,
  marginRight: 5,
  marginTop: 5,
};

export const CreateNodes = () => {

    const handleClick = useCallback(() => {

    }, [])

  return (
    <Panel position="top-left" style={panelStyle}>
      <div className="description">
        This is an example of how you can use the zoom pan helper hook
      </div>
      <div>
        <button className="xy-theme__button" style={buttonStyle}>
          focus node
        </button>
        <button className="xy-theme__button" style={buttonStyle}>
          zoom in
        </button>
        <button className="xy-theme__button" style={buttonStyle}>
          zoom out
        </button>
      </div>
    </Panel>
  );
};
