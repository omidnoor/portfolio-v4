import Image from "next/image";
import styles from "./styles.module.scss";
import { useSpring, animated } from "react-spring";
import { useStore } from "@/stores/store";
import { iconsSize } from "@/stores/variables";
import { memo, useEffect } from "react";

const BackButton = () => {
  const {
    setActiveMenuButton,
    setImageClicked,
    setNoteClicked,
    setActiveMenu,
    setBackClicked,
    backClicked,
  } = useStore();

  const [props, api] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      mass: 1,
      tension: 100,
      friction: 5,
    },
  }));

  const handleClick = (e) => {
    // e.stopPropagation();
    setBackClicked(!backClicked);
  };

  useEffect(() => {
    setImageClicked(false);
    setNoteClicked(false);
    setActiveMenuButton("");
  }, [backClicked]);

  const handleEnter = () => {
    api.start({ scale: 1.2 });
  };

  const handleLeave = () => {
    api.start({ scale: 1 });
  };

  return (
    <animated.div
      className={` ${styles.buttonBack}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ transform: props.scale?.to((s) => `scale(${s})`) }}
      // className={` ${styles.buttonBack}`}
    >
      <Image
        width={iconsSize}
        height={iconsSize}
        className={styles.card__blur}
        src="/icons/back-icon-v1.png"
        alt=""
      />
      <Image
        width={iconsSize}
        height={iconsSize}
        className={styles.card__img}
        src="/icons/back-icon-v1.png"
        alt=""
      />
    </animated.div>
  );
};
export default memo(BackButton);
