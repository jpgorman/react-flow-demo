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


- Add styles per nodeType
- Add error message on invalid connection
- Add Any node type to show model ouput connection
- Add mutilple outputs and tidy label position



- Keep state external and control the flows: https://reactflow.dev/learn/advanced-use/state-management

