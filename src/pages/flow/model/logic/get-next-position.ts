import type { CustomNode } from "../typing";

type Position = CustomNode["position"];

/**
 *
 * For give the magic numbers.
 * With more time I would prefer to actually measure
 * the last added node and then place the next node
 * just outside of the coordinates of that node.
 * Due to time constraints I opted to set some "reasonable"
 * defaults, but they aren't at all exact.
 */
const NODE_WIDTH = 140;
const NODE_HEIGHT = 180;
const ADJUST_STEP = 40;

const DEFAULT_POSITION: Position = {
  x: 0,
  y: 0,
};

/*
 * We're using a simple collision detection method
 * to handle placement of new nodes.
 * Looking around it seems that a producion ready
 * approach would use layout engines like Dagre.
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
    x: latestAdded.position.x + NODE_WIDTH,
    y: latestAdded.position.y,
  };

  while (isOverlapping(newPosition, nodes)) {
    newPosition.y += ADJUST_STEP;
  }

  return newPosition;
};
