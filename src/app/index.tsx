import type { PropsWithChildren } from "react";

export const App = ({ children }: PropsWithChildren) => {
  return <div style={{ width: "100vw", height: "100vh" }}>{children}</div>;
};
