import { useStore } from "@/stores/store";
import Image from "next/image";
import { iconsSize } from "@/stores/variables";
import { animated, useSpring } from "react-spring";

import styles from "./styles.module.scss";

const NoteContent = () => {
  const setNoteClicked = useStore((state) => state.setNoteClicked);
  const noteClicked = useStore((state) => state.noteClicked);

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
    setNoteClicked(!noteClicked);
  };

  const handleEnter = (e) => {
    e.stopPropagation();
    api.start({ scale: 1.2 });
  };

  const handleLeave = (e) => {
    e.stopPropagation();
    api.start({ scale: 1 });
  };

  return (
    <animated.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ transform: props.scale?.to((s) => `scale(${s})`) }}
      className={styles.card}
    >
      <Image
        className={styles.card__img}
        src="/icons/notes.png"
        width={iconsSize}
        height={iconsSize}
      />
      <Image
        className={styles.card__blur}
        src="/icons/notes.png"
        width={iconsSize}
        height={iconsSize}
      />
    </animated.div>
  );
};
export default NoteContent;
