import type { CustomNode, CustomNodeType } from "./Node.types";

type PartialProps = Partial<Omit<CustomNode, "position">>;
type RequiredProps = {
  position: CustomNode["position"];
  type: CustomNodeType;
};

export const createNode = ({
  type,
  ...overrides
}: PartialProps & RequiredProps): CustomNode => {
  return {
    ...overrides,
    type,
    id: crypto.randomUUID(),
    data: createNodeData(type),
  };
};

// TODO: Make this function more DRY
export const createNodeData = (type: CustomNodeType): CustomNode["data"] => {
  switch (type) {
    case "DataSource": {
      return {
        nodeType: "DataSource",
        label: "DataSource",
        outputs: {
          dataset: {
            type: "Dataset",
            label: "Dataset",
          },
        },
      };
    }
    case "Transform": {
      return {
        nodeType: "Transform",
        label: "Transform",
        inputs: {
          dataset: {
            type: "Dataset",
            label: "Dataset",
          },
        },
        outputs: {
          dataset: {
            type: "Dataset",
            label: "Dataset",
          },
        },
      };
    }
    case "Model": {
      return {
        nodeType: "Model",
        label: "Model",
        inputs: {
          dataset: {
            type: "Dataset",
            label: "Dataset",
          },
        },
        outputs: {
          model: {
            type: "Model",
            label: "Model",
          },
        },
      };
    }
  }
};
