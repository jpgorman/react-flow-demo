- Create custom nodes
  - DataSource
    - node type = output
  - Transform
    - node type = default
  - Model
    - node type = default
  - Attributes
    - Each input handle can only accept one connection
    - Each output handle can have multiple outgoing connections
      - Attempting to replace an existing incoming edge, should either replace the existing or show and error.
  - Types
    - DataSource - Outputs: Dataset
    - Transform - Inputs: Dataset , Outputs: Dataset
    - Model - Inputs: Dataset , Outputs: Model
  - Handles
    - Custom? https://reactflow.dev/learn/customization/handles

- Add interactivity
  - Allow for nodes to react to position changes etc
    https://reactflow.dev/learn/concepts/adding-interactivity
- Handle connections
  - Can be used to edge validation? https://reactflow.dev/learn/concepts/adding-interactivity#handling-connections

- Allow dynamic addition of nodes
  - ControlButton for grouping ?https://reactflow.dev/api-reference/components/control-button

- Limit number of incoming edges : https://reactflow.dev/examples/nodes/connection-limit

- Custom Nodes : https://reactflow.dev/examples/nodes/custom-node
