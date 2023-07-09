import { useState } from "react";
import { useRef } from "react";
import {
  useIsomorphicLayoutEffect,
  useSpring,
  useSpringValue,
} from "react-spring";
import { useDock } from "../Dock/DockContext";
import { useMousePosition } from "../Hooks/useMousePosition";
import { useWindowResize } from "../Hooks/useWindowResize";
import { useEffect } from "react";
import { animated } from "react-spring";
import styles from "./styles.module.scss";

export const DockCard = ({ children }) => {
  const cardRef = useRef();
  const [initialWidth, setInitialWidth] = useState(50);

  const [props, api] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      mass: 1,
      tension: 100,
      friction: 5,
    },
  }));

  const handleClick = (e) => {};

  const handleEnter = () => {
    api.start({ scale: 1.2 });
  };

  const handleLeave = () => {
    api.start({ scale: 1 });
  };

  return (
    <div className={styles["dock-card-container"]}>
      <animated.button
        ref={cardRef}
        className={styles["dock-card"]}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        style={{ transform: props.scale?.to((s) => `scale(${s})`) }}
      >
        {children}
      </animated.button>
    </div>
  );
};
