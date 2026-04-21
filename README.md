## JP Gorman - Flow Demo

### Requirements

Built using Node LTS v24

### Install dependencies

```sh
$ npm ci
```

### How to run

```sh
$ npm run dev
```

### Your approach to structuring the code

I've used vertical slices to organise my code. The main benefits are:

e.g.

```sh
/src
    /app
    /pages
        /flow
            /ui (components/hooks etc)
            /model (types, schema, business logic)
```

- high cohesion
- reduce impact of changing business rules changes
- colocate code based on purpose (what is does, not what it is)

### How you implemented type validation

I've used the `isValidConnection` to implement validation of connections. This calls a method which checks the source and target for a given connection. From there we find the inputs for the target node and outputs for the source node and then check that that the input type matches the output type. This returns a boolean which markes the connection as either valid or invalid.

Later I use the onConnectEnd method to check if the connection is in a valid state and show a toast if the conneciton is invalid.

This is a pure function, so can be unit tested.

### Any design decisions you made (e.g., state management approach)

I did ponder using zustand for global and localized state. The advantage is that is would make the flow component a controlled component, meaning it renders when changes to that higher level state are dispatched. This would keep the flow component dumb. However I decided that although this is the better choice and for the sake of brevity I'd point out this this is the case and instead focus on the main tasks at hand. Therefore I chose to keep the state local to the flow component. Let's just take it as a given that this probably isn't the best choice for prod.

### What you might improve if you had more time

- Add unit tests
- Improve linting to include type checks and formatting
- Add pre-commit hooks
- Allow for inputs and outputs to be set dynamically based on the nodeType
- Collision detection is basic at best. Some work here would make the result feel much more professional. Using tools like dagre or d3-force whch some animation would go a long way to improve this. https://reactflow.dev/examples/layout/auto-layout
- I've kept styling to a minimum. For component I've used the simplest approach and used react CSSProperties. This puts the styles along side their consumbers. For react-flow specific overrides I've put these into the index.css though I've name spaced these overrides to the custom node components. Implementing tailwind or some other css toolbelt with treeshaking would scale much better and reduce the need for css in js entirely.
- I'd really like to have the inputs and outputs keys inferred by typescript.

Any assumptions you made about the requirements

- There aren't any connections with inputs/ouputs for the Any nodeType. I've tested this by hard coding some of the generated nodes. The specified nodes and their inputs/outputs don't mention the Any nodeType so I've not included that type here, but I have accounted for it in the validation.

## Follow Ups

### Adding node configuration/parameters

Add config to CustomNode data.
Allow config to be amended in panel.
Use Zod or similar to define and validate schema using in panel form
Should be re-usable so that schemas can be applied and forms generated

### Handling conditional logic or branching workflows

This can be done using multiple output handles
Hooks like updateNodeData can be used to store a conditional outcome
Edges will know which condition is being used via the sourceHandle, this relies on well named handles

### Validation

Treat the workflow as a structured graph
Testing for nodes with no inputs
Required input handles have connections

Run the the output (generated graph) through some kind of graph validity heurisitc, cycle detection for example

### Persisting and loading workflows

Can save the nodes and edges to local storage as json, or send via api
Hydrate state from JSON to load in nodes and edges
Neeed to be careful to use versioning in app. If app schema has changed may need to migrate stored data before loading.

Check valid connections e.g. isValidConnection
