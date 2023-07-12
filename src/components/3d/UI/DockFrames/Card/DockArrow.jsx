import Image from "next/image";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { pages } from "@/stores/data";
import { useDock } from "../Dock/DockContext";
import { iconsSize } from "@/stores/variables";
import { useSpring, animated } from "react-spring";

const DockArrow = ({ type }) => {
  const arrowButton = useStore((state) => state.arrowButton);
  const setArrowButton = useStore((state) => state.setArrowButton);
  const arrowCount = useStore((state) => state.arrowCount);
  const setArrowCount = useStore((state) => state.setArrowCount);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const activeMenuButton = useStore((state) => state.activeMenuButton);

  const dock = useDock();

  const handleClick = (e) => {
    e.stopPropagation();
    setArrowButton(type);
    setArrowCount(arrowCount + (type === "left" ? -1 : 1));
  };

  useEffect(() => {
    if (activeMenuButton === "About Me") {
    }
  }, [activeMenuButton]);

  useEffect(() => {
    setArrowButton("");
    setArrowCount(0);
  }, [isSceneClicked]);

  const [props, api] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      mass: 1,
      tension: 100,
      friction: 5,
    },
  }));

  const handleEnter = () => {
    api.start({ scale: 1.2 });
  };

  const handleLeave = () => {
    api.start({ scale: 1 });
  };

  return (
    <>
      {(activeMenuButton === "Projects" || activeMenuButton === "About Me") &&
        (type === "left" ? (
          <animated.div
            className={styles.card}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{ transform: props.scale?.to((s) => `scale(${s})`) }}
          >
            <Image
              src="/icons/arrow-left.png"
              width={iconsSize}
              height={iconsSize}
              className={styles.card__blur}
              alt="left"
            />
            <Image
              src="/icons/arrow-left.png"
              width={iconsSize}
              height={iconsSize}
              className={styles.card__img}
              alt="left"
            />
          </animated.div>
        ) : (
          <animated.div
            className={styles.card}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{ transform: props.scale?.to((s) => `scale(${s})`) }}
          >
            <Image
              src="/icons/arrow-right.png"
              width={iconsSize}
              height={iconsSize}
              className={styles.card__blur}
              alt="right"
            />
            <Image
              src="/icons/arrow-right.png"
              width={iconsSize}
              height={iconsSize}
              className={styles.card__img}
              alt="right"
            />
          </animated.div>
        ))}
    </>
  );
};
export default DockArrow;
