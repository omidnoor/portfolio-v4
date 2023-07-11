import { useEffect, useState } from "react";
import { useRef } from "react";
import { useSpring } from "react-spring";
import { pages } from "@/stores/data";
import { animated } from "react-spring";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";

export const DockCard = ({ children, type }) => {
  const cardRef = useRef();
  const [initialWidth, setInitialWidth] = useState(50);
  const [hasSub, setHasSub] = useState(false);

  const activeMenuButton = useStore((state) => state.activeMenuButton);

  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    active?.sub && setHasSub(true);
    !active?.sub && setHasSub(false);
  }, [activeMenuButton]);

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
        disabled={(type === "left" || type === "right") && !hasSub}
        className={styles["dock-card"]}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        style={{
          transform: props.scale?.to((s) => `scale(${s})`),
          filter:
            (type === "left" || type === "right") && !hasSub
              ? "saturate(0.5) brightness(0.5)"
              : "",
          backgroundColor:
            (type === "left" || type === "right") && !hasSub ? "#555" : "",
          cursor:
            (type === "left" || type === "right") && !hasSub ? "auto" : "",
        }}
      >
        {children}
      </animated.button>
    </div>
  );
};
