import type { CustomNode } from "./node.types";

// TODO: Probable a hook
export const useGetNextPosition = (
  nodes: Array<CustomNode>
): CustomNode["position"] => {
  return {
    x: 0,
    y: 0,
  };
};
