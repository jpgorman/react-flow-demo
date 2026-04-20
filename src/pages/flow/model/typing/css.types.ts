import type { CSSProperties } from "react";

export type CSSProps = Record<
  string,
  CSSProperties | Record<string, CSSProperties>
>;
