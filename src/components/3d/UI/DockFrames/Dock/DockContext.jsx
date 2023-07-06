import { useContext } from "react";
import { createContext } from "react";

export const DockContext = createContext({
  width: 0,
  hovered: false,
  disabled: false,
  setDisabled: () => {},
  setIsZooming: () => {},
});

export const useDock = () => {
  return useContext(DockContext);
};
