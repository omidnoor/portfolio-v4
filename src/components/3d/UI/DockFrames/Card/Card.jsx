import Image from "next/image";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

const Card = ({ page }) => {
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const isSceneClicked = useStore((state) => state.isSceneClicked);

  const handleClick = () => {
    setActiveMenuButton(page.name);
  };

  useEffect(() => {
    // setActiveMenuButton("");
  }, [isSceneClicked]);

  return (
    <div className={styles.card} onClick={handleClick}>
      {page.name !== "arrow-right" && page.name !== "arrow-left" && (
        <>
          <img className={styles.card__blur} src={page.imageUrl} alt="" />
          <img className={styles.card__img} src={page.imageUrl} alt="" />
        </>
      )}
      {page.name === "arrow-right" && <BiRightArrow size={30} fill="#cdfdc4" />}
      {page.name === "arrow-left" && <BiLeftArrow size={30} fill="#cdfdc4" />}
    </div>
  );
};
export default Card;
