import Image from "next/image";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { iconsSize } from "@/stores/variables";

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

  useEffect(() => {});

  return (
    <>
      {page.name !== "arrow-right" && page.name !== "arrow-left" && (
        <div className={styles.card} onClick={handleClick}>
          <Image
            width={iconsSize}
            height={iconsSize}
            className={styles.card__blur}
            src={page.imageUrl}
            alt=""
          />
          <Image
            width={iconsSize}
            height={iconsSize}
            className={styles.card__img}
            src={page.imageUrl}
            alt=""
          />
        </div>
      )}
    </>
  );
};
export default Card;
