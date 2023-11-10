import ImageContent from "./ImageContent";
import { useSpring, animated } from "react-spring";
import NoteContent from "./NoteContent";

import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect, useState } from "react";
import DockArrow from "../Card/DockArrow";
import { useWindowWidth } from "@/components/3d/Utils/useWindowWidth";

const ContentMenu = () => {
  const [display, setDisplay] = useState(false);

  const { isContentIcons, setIsContentIcons, activeMenuButton } = useStore();

  const [props, api] = useSpring(() => ({
    from: { y: 10, opacity: 1 },
    config: {
      mass: 0.1,
      friction: 29,
      tension: 238,
    },
  }));

  const width = useWindowWidth();

  useEffect(() => {
    if (activeMenuButton === "About Me" && width < 500) {
      setIsContentIcons(true);
      setDisplay(false);
    }
    if (activeMenuButton === "Projects") {
      setIsContentIcons(true);
      setDisplay(false);
    } else if (
      activeMenuButton === "Home" ||
      activeMenuButton === "Contact Me"
    ) {
      setDisplay(true);
    } else if (activeMenuButton === "About Me" && width < 500) {
      setIsContentIcons(true);
      setDisplay(false);
    } else {
      setIsContentIcons(false);
      setDisplay(false);
    }
  }, [activeMenuButton, width]);

  useEffect(
    () => {
      if (isContentIcons) {
        api.start({ y: 0, opacity: 1 });
      } else {
        api.start({ y: 200, opacity: 0 });
      }
    },
    [isContentIcons, api],
    width,
  );

  return (
    <animated.div
      className={styles.container}
      style={{
        transform: props.y.to((y) => `translate3d(-50%,${y - 80}px,0)`),
        opacity: props.opacity,
        display: display ? "none" : "flex",
        zIndex: -1,
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
      }}
    >
      <DockArrow type="left" />
      {/* <ImageContent /> */}
      {/* <NoteContent /> */}
      <DockArrow type="right" />
    </animated.div>
  );
};
export default ContentMenu;
