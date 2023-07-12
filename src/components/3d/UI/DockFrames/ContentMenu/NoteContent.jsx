import { useStore } from "@/stores/store";
import Image from "next/image";
import { iconsSize } from "@/stores/variables";
import { animated, useSpring } from "react-spring";

import styles from "./styles.module.scss";
import { useEffect } from "react";

const NoteContent = () => {
  const setNoteClicked = useStore((state) => state.setNoteClicked);
  const noteClicked = useStore((state) => state.noteClicked);
  const setDollyCount = useStore((state) => state.setDollyCount);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const arrowCount = useStore((state) => state.arrowCount);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setLastClick = useStore((state) => state.setLastClick);
  const setPlateClicked = useStore((state) => state.setPlateClicked);
  const setHtmlClicked = useStore((state) => state.setHtmlClicked);

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
    // setNoteClicked(true);
    setPlateClicked(true);
    setHtmlClicked(false);
    setDollyCount(1);
    setLastClick("plate");
  };

  useEffect(() => {
    // setNoteClicked(false);
    setPlateClicked(false);
    setDollyCount(0);
  }, [isSceneClicked, activeMenuButton]);

  const handleEnter = (e) => {
    // e.stopPropagation();
    api.start({ scale: 1.2 });
  };

  const handleLeave = (e) => {
    // e.stopPropagation();
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
        alt="icon note"
      />
      <Image
        className={styles.card__blur}
        src="/icons/notes.png"
        width={iconsSize}
        height={iconsSize}
        alt="icon note"
      />
    </animated.div>
  );
};
export default NoteContent;
