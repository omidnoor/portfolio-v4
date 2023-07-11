import ImageContent from "./ImageContent";
import { useSpring, animated } from "react-spring";
import NoteContent from "./NoteContent";

import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect } from "react";

const ContentMenu = () => {
  const setIsContentIcons = useStore((state) => state.setIsContentIcons);
  const isContentIcons = useStore((state) => state.isContentIcons);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const isSceneClicked = useStore((state) => state.isSceneClicked);

  const [props, api] = useSpring(() => ({
    from: { y: 10, opacity: 1 },
    config: {
      mass: 0.1,
      friction: 29,
      tension: 238,
    },
  }));

  useEffect(() => {
    if (activeMenuButton === "Projects" || activeMenuButton === "About Me") {
      setIsContentIcons(true);
    } else {
      setIsContentIcons(false);
    }
  }, [activeMenuButton, isSceneClicked]);

  useEffect(() => {
    if (isContentIcons) {
      api.start({ y: 0, opacity: 1 });
    } else {
      api.start({ y: 10, opacity: 0 });
    }
  }, [isContentIcons, api]);

  return (
    <animated.div
      className={styles.container}
      style={{
        transform: props.y.to((y) => `translate3d(-50%,${y}px,0)`),
        opacity: props.opacity,
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
      }}
    >
      <ImageContent />
      <NoteContent />
    </animated.div>
  );
};
export default ContentMenu;