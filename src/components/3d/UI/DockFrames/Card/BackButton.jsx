import Image from "next/image";
import styles from "./styles.module.scss";
import { useSpring, animated } from "react-spring";
import { useStore } from "@/stores/store";

const BackButton = () => {
  const setBackClicked = useStore((state) => state.setBackClicked);
  const backClicked = useStore((state) => state.backClicked);
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

  const handleEnter = () => {
    api.start({ scale: 1.2 });
  };

  const handleLeave = () => {
    api.start({ scale: 1 });
  };

  return (
    <animated.div
      className={styles.backButton}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ transform: props.scale?.to((s) => `scale(${s})`) }}
    >
      <Image
        width={40}
        height={40}
        className={styles.card__blur}
        src="/icons/back-icon-v1.png"
        alt=""
      />
      <Image
        width={40}
        height={40}
        className={styles.card__img}
        src="/icons/back-icon-v1.png"
        alt=""
      />
    </animated.div>
  );
};
export default BackButton;
