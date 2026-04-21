import { type PropsWithChildren, useEffect } from "react";

type Props = PropsWithChildren<{
  onClose: () => void;
}>;

const DELAY = 1000;

export const Toast = ({ onClose, children }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return <div>{children}</div>;
};
