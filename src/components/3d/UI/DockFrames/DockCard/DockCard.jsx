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

const INITIAL_WIDTH = 48;

export const DockCard = ({ children }) => {
  const cardRef = useRef();
  /**
   * This doesn't need to be real time, think of it as a static
   * value of where the card should go to at the end.
   */
  const [elCenterX, setElCenterX] = useState(0);

  const size = useSpringValue(INITIAL_WIDTH, {
    config: {
      mass: 1,
      tension: 220,
      friction: 100,
    },
  });

  const opacity = useSpringValue(0);
  const y = useSpringValue(0, {
    config: {
      friction: 29,
      tension: 320,
      friction: 100,
    },
  });

  const dock = useDock();
  // console.log(dock.width);

  /**
   * This is just an abstraction around a `useSpring` hook, if you wanted you could do this
   * in the hook above, but these abstractions are useful to demonstrate!
   */
  useMousePosition(
    {
      onChange: ({ value }) => {
        const mouseX = value.x;
        if (dock.width > 0) {
          const transformedValue =
            INITIAL_WIDTH +
            36 *
              Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) **
                12;
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
      size.start(INITIAL_WIDTH);
    }
  }, [dock.hovered]);

  useWindowResize(() => {
    const { x } = cardRef.current.getBoundingClientRect();

    setElCenterX(x + INITIAL_WIDTH / 2);
  });

  const timesLooped = useRef(0);
  const timeoutRef = useRef();
  const isAnimating = useRef(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isAnimating.current) {
      isAnimating.current = true;
      opacity.start(0.5);

      timesLooped.current = 0;

      y.start(-INITIAL_WIDTH / 2, {
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
