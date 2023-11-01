import clamp from "lodash.clamp";
import React, { createContext, useContext, useRef } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import useMeasure from "react-use-measure";
import { useStore } from "@/stores/store";

export const DragContext = createContext();

export const DragContainer = ({ children }) => {
  const { setIsDragging, isDragging } = useStore();
  // console.log(isDragging);
  const index = useRef(0);
  const [ref, { width }] = useMeasure();
  // console.log(width);
  const [props, api] = useSprings(
    React.Children.count(children),
    (i) => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: "block",
    }),
    [width],
  );

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (active) {
        setIsDragging(true);
      } else {
        setIsDragging(false);
      }
      // console.log(distance);
      if (active && distance > width / 2) {
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          React.Children.count(children) - 1,
        );
        cancel();
      }
      api.start((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - distance / width / 2 : 1;
        return { x, scale, display: "block" };
      });
    },
  );

  return (
    <DragContext.Provider value={{ props, bind }}>
      <div ref={ref}>{children}</div>
    </DragContext.Provider>
  );
};

export const DragCard = ({ children, cardIndex }) => {
  const { props, bind } = useContext(DragContext);

  const { x, scale, display } = props[cardIndex];
  // console.log(props);
  return (
    <animated.div {...bind()} style={{ display, x }}>
      <animated.div style={{ scale }}>{children}</animated.div>
    </animated.div>
  );
};
