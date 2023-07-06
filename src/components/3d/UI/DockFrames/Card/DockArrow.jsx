import Image from "next/image";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { pages } from "@/stores/data";
import { useDock } from "../Dock/DockContext";

const DockArrow = ({ type }) => {
  const arrowButton = useStore((state) => state.arrowButton);
  const setArrowButton = useStore((state) => state.setArrowButton);
  const arrowCount = useStore((state) => state.arrowCount);
  const setArrowCount = useStore((state) => state.setArrowCount);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const activeMenuButton = useStore((state) => state.activeMenuButton);

  const dock = useDock();

  const handleClick = () => {
    setArrowButton(type);
    setArrowCount(arrowCount + (type === "left" ? -1 : 1));
  };

  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    if (active?.sub) {
      dock.setDisabled(false);
    } else {
      dock.setDisabled(true);
    }
  }, [activeMenuButton]);

  useEffect(() => {
    setArrowButton("");
    setArrowCount(0);
  }, [isSceneClicked]);

  return (
    <div className={styles.card} onClick={handleClick}>
      {type === "right" && (
        <BiRightArrow
          size={30}
          fill={!dock.disabled ? "#cdfdc4" : "#999"}
          cursor={!dock.disabled ? "pointer" : "auto"}
        />
      )}
      {type === "left" && (
        <BiLeftArrow
          size={30}
          fill={!dock.disabled ? "#cdfdc4" : "#999"}
          cursor={!dock.disabled ? "pointer" : "auto"}
        />
      )}
    </div>
  );
};
export default DockArrow;
