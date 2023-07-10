import { useStore } from "@/stores/store";
import Image from "next/image";
import { iconsSize } from "@/stores/variables";
import { animated, useSpring } from "react-spring";

import styles from "./styles.module.scss";
import { useEffect } from "react";

const ImageContent = () => {
  const setImageClicked = useStore((state) => state.setImageClicked);
  const imageClicked = useStore((state) => state.imageClicked);
  const setDollyCount = useStore((state) => state.setDollyCount);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const arrowCount = useStore((state) => state.arrowCount);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setLastClick = useStore((state) => state.setLastClick);
  const setHtmlClicked = useStore((state) => state.setHtmlClicked);
  const htmlClicked = useStore((state) => state.htmlClicked);
  const setPlateClicked = useStore((state) => state.setPlateClicked);

  const [props, api] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      mass: 1,
      tension: 100,
      friction: 5,
    },
  }));

  const handleClick = (e) => {
    e.stopPropagation();
    // console.log(e);
    // setImageClicked(true);
    setHtmlClicked(true);
    setPlateClicked(false);
    setDollyCount(1);
    setLastClick("html");
  };

  useEffect(() => {
    // setImageClicked(false);
    setHtmlClicked(false);
    setDollyCount(0);
  }, [isSceneClicked, activeMenuButton, arrowCount]);

  const handleEnter = () => {
    api.start({ scale: 1.2 });
  };

  const handleLeave = () => {
    api.start({ scale: 1 });
  };

  return (
    <animated.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{
        transform: props.scale?.to((s) => `scale(${s})`),
      }}
      className={styles.card}
    >
      <Image
        className={styles.card__img}
        src="/icons/image.png"
        width={iconsSize}
        height={iconsSize}
        alt="icon image"
      />
      <Image
        className={styles.card__blur}
        src="/icons/image.png"
        width={iconsSize}
        height={iconsSize}
        alt="icon image"
      />
    </animated.div>
  );
};
export default ImageContent;
