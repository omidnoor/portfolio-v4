import { animated, useSpringValue } from "@react-spring/web";
import { clamp } from "@react-spring/shared";

import { useWindowResize } from "../Hooks/useWindowResize";

import { DockContext } from "./DockContext";

import styles from "./styles.module.scss";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";

export const DOCK_ZOOM_LIMIT = [-100, 50];

export const Dock = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const isZooming = useRef(false);
  const dockRef = useRef();

  return (
    <animated.div
      ref={dockRef}
      className={styles.dock}
      onMouseOver={(e) => {
        // e.stopPropagation();
        if (!isZooming.current) {
          setHovered(true);
        }
      }}
      onMouseOut={(e) => {
        // e.stopPropagation();
        setHovered(false);
      }}
    >
      {children}
    </animated.div>
  );
};
