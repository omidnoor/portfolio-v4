import Image from "next/image";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { memo } from "react";
import { iconsSize } from "@/stores/variables";

const Card = ({ page }) => {
  const { setActiveMenuButton, isSceneClicked } = useStore();

  const handleClick = () => {
    setActiveMenuButton(page.name);
  };

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
export default memo(Card);
