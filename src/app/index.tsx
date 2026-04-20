import type { PropsWithChildren } from "react";

const styles = {
  container: { width: "100vw", height: "100vh" },
};

export const App = ({ children }: PropsWithChildren) => {
  return <div style={styles.container}>{children}</div>;
};
