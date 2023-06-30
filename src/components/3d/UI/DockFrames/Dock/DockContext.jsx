import { useContext } from "react";
import { createContext } from "react";

export const DockContext = createContext({
  width: 0,
  hovered: false,
  setIsZooming: () => {},
});

export const useDock = () => {
  return useContext(DockContext);
};
