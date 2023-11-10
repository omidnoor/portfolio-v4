import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { memo, useEffect, useState } from "react";
import { useSpring, a } from "react-spring";

const DockArrow = ({ type }) => {
  const {
    setArrowButton,
    arrowCount,
    setArrowCount,
    isSceneClicked,
    activeMenuButton,
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);

  // const dock = useDock();

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

  const { scale } = useSpring({
    scale: isHovered ? 1.2 : 1,
    config: {
      mass: 1,
      tension: 100,
      friction: 5,
    },
  });
  const handleEnter = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {(activeMenuButton === "Projects" || activeMenuButton === "About Me") &&
        (type === "left" ? (
          <a.div
            className={`${styles.card} ${styles.arrows}`}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{ transform: scale?.to((s) => `scale(${s})`) }}
          >
            {/* <img
              style={{ width: "80px", height: "80px" }}
              src="/icons/arrow-left.png"
              className={styles.card__blur}
              alt="left"
            /> */}
            <img
              style={{ width: "80px", height: "80px" }}
              src="/icons/arrow-left.png"
              className={styles.card__img}
              alt="left"
            />
          </a.div>
        ) : (
          <a.div
            className={`${styles.card} ${styles.arrows}`}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
              transform: scale?.to((s) => `scale(${s})`),
            }}
          >
            {/* <img
              style={{ width: "80px", height: "80px" }}
              src="/icons/arrow-right.png"
              className={styles.card__blur}
              alt="right"
            /> */}
            <img
              style={{ width: "80px", height: "80px" }}
              src="/icons/arrow-right.png"
              className={styles.card__img}
              alt="right"
            />
          </a.div>
        ))}
    </>
  );
};
export default memo(DockArrow);
