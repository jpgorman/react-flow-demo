import type { CustomNode } from "./node.types";

type Position = CustomNode["position"];

const DEFAULT_POSITION: Position = {
  x: 0,
  y: 0,
};

const OFFSETS = {
  x: 100,
  y: 100,
};
const NODE_WIDTH = 100;
const NODE_HEIGHT = 100;
const ADJUST_STEP = 40;

/*
* We're using a simple collision detection method
* to handle placement of new nodes.
* Looking around it seems that a producion ready
* approach would use layour engines like Dagre.
*/

const isOverlapping = (position: Position, nodes: Array<CustomNode>) =>
  nodes.some((node) => {
    return (
      position.x < node.position.x + NODE_WIDTH &&
      position.x + NODE_WIDTH > node.position.x &&
      position.y < node.position.y + NODE_HEIGHT &&
      position.y + NODE_HEIGHT > node.position.y
    );
  });

export const getNextPosition = (nodes: Array<CustomNode>): Position => {
  if (nodes.length === 0) {
    return DEFAULT_POSITION;
  }

  const latestAdded = nodes[nodes.length - 1];

  const newPosition = {
    x: latestAdded.position.x + OFFSETS.x,
    y: latestAdded.position.y + OFFSETS.y,
  };

  while (isOverlapping(newPosition, nodes)) {
    newPosition.y += ADJUST_STEP;
  }

  return newPosition;
};
