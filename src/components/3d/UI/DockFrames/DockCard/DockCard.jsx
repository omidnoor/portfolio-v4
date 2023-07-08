import { useState } from "react";
import { useRef } from "react";
import { useIsomorphicLayoutEffect, useSpringValue } from "react-spring";
import { useDock } from "../Dock/DockContext";
import { useMousePosition } from "../Hooks/useMousePosition";
import { useWindowResize } from "../Hooks/useWindowResize";
import { useEffect } from "react";
import { animated } from "react-spring";
import { pages } from "@/stores/data";

import styles from "./styles.module.scss";
import { useThree } from "@react-three/fiber";

// let initialWidth;

export const DockCard = ({ children }) => {
  const cardRef = useRef();
  const [initialWidth, setInitialWidth] = useState(40);

  const [elCenterX, setElCenterX] = useState(0);
  const dock = useDock();

  useWindowResize(() => {
    const { x } = cardRef.current.getBoundingClientRect();

    setElCenterX(x + initialWidth / 4);
  });
  console.log(elCenterX);
  const size = useSpringValue(initialWidth, {
    config: {
      mass: 0.1,
      tension: 320,
      friction: 100,
    },
  });

  const opacity = useSpringValue(0);
  const y = useSpringValue(0, {
    config: {
      friction: 29,
      tension: 238,
    },
  });

  // console.log(dock.width);

  useMousePosition(
    {
      onChange: ({ value }) => {
        const mouseX = value.x;
        if (dock.width > 0) {
          const transformedValue =
            initialWidth +
            20 *
              Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) **
                100;
          if (dock.hovered) {
            size.start(transformedValue);
          }
        }
      },
    },
    [elCenterX, dock],
  );

  useIsomorphicLayoutEffect(() => {
    if (!dock.hovered) {
      size.start(initialWidth);
    }
  }, [dock.hovered]);

  const timesLooped = useRef(0);
  const timeoutRef = useRef();
  const isAnimating = useRef(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isAnimating.current) {
      isAnimating.current = true;
      opacity.start(0.5);

      timesLooped.current = 0;

      y.start(-initialWidth / 4, {
        loop: () => {
          if (1 === timesLooped.current++) {
            timeoutRef.current = setTimeout(() => {
              opacity.start(0);
              y.set(0);
              isAnimating.current = false;
              timeoutRef.current = undefined;
            }, 1000);
            y.stop();
          }
          return { reverse: true };
        },
      });
    } else {
      /**
       * Allow premature exit of animation
       * on a second click if we're currently animating
       */
      clearTimeout(timeoutRef.current);
      opacity.start(0);
      y.start(0);
      isAnimating.current = false;
    }
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className={styles["dock-card-container"]}>
      <animated.button
        // disabled={true}
        ref={cardRef}
        className={styles["dock-card"]}
        onClick={(e) => handleClick(e)}
        style={{
          width: size,
          height: size,
          y,
        }}
      >
        {children}
      </animated.button>
      <animated.div className={styles["dock-dot"]} style={{ opacity }} />
    </div>
  );
};
