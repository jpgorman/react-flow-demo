import type {
  CustomNode,
  CustomNodeType,
  DataType,
  HandleParam,
} from "./node.types";

type PartialProps = Partial<Omit<CustomNode, "position">>;
type RequiredProps = {
  position: CustomNode["position"];
  type: CustomNodeType;
};

export const createNode = ({
  type,
  ...overrides
}: PartialProps & RequiredProps): CustomNode => {
  const id = crypto.randomUUID();
  return {
    ...overrides,
    type,
    id,
    data: createNodeData(type, id),
  };
};

const generateHandleParam = (type: DataType): HandleParam => ({
  type,
  label: type,
});

// TODO: Make this function more DRY
export const createNodeData = (
  type: CustomNodeType,
  id: string
): CustomNode["data"] => {
  switch (type) {
    case "DataSource": {
      return {
        nodeType: "DataSource",
        label: "DataSource",
        outputs: {
          [`${id}-output-a`]: generateHandleParam("Dataset"),
        },
      };
    }
    case "Transform": {
      return {
        nodeType: "Transform",
        label: "Transform",
        inputs: {
          [`${id}-input-a`]: generateHandleParam("Dataset"),
          [`${id}-input-b`]: generateHandleParam("Dataset"),
        },
        outputs: {
          [`${id}-output-a`]: generateHandleParam("Dataset"),
          [`${id}-output-b`]: generateHandleParam("Dataset"),
        },
      };
    }
    case "Model": {
      return {
        nodeType: "Model",
        label: "Model",
        inputs: {
          [`${id}-input-a`]: generateHandleParam("Dataset"),
          [`${id}-input-b`]: generateHandleParam("Dataset"),
        },
        outputs: {
          [`${id}-output-a`]: generateHandleParam("Model"),
          [`${id}-output-b`]: generateHandleParam("Model"),
        },
      };
    }
  }
};
