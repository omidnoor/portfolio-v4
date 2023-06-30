import Image from "next/image";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect } from "react";

const Card = ({ page }) => {
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const handleClick = () => {
    setActiveMenuButton(page.name);
  };
  useEffect(() => {
    setActiveMenuButton("");
  }, [isSceneClicked]);

  return (
    <div className={styles.card} onClick={handleClick}>
      {/* {page.name === activeMenuButton && (
        <div className={styles.card__buttonName}>
          <p>{activeMenuButton}</p>
        </div>
      )} */}
      <img className={styles.card__blur} src={page.imageUrl} alt="" />
      <img className={styles.card__img} src={page.imageUrl} alt="" />
    </div>
  );
};
export default Card;
