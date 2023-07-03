import Image from "next/image";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

const DockArrow = ({ type }) => {
  const arrowButton = useStore((state) => state.arrowButton);
  const setArrowButton = useStore((state) => state.setArrowButton);
  const arrowCount = useStore((state) => state.arrowCount);
  const setArrowCount = useStore((state) => state.setArrowCount);
  const isSceneClicked = useStore((state) => state.isSceneClicked);

  const handleClick = () => {
    setArrowButton(type);
    setArrowCount(arrowCount + (type === "left" ? -1 : 1));
  };

  useEffect(() => {
    setArrowButton("");
    setArrowCount(0);
  }, [isSceneClicked]);

  return (
    <div className={styles.card} onClick={handleClick}>
      {type === "right" && <BiRightArrow size={30} fill="#cdfdc4" />}
      {type === "left" && <BiLeftArrow size={30} fill="#cdfdc4" />}
    </div>
  );
};
export default DockArrow;
