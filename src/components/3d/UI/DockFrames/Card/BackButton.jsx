import Image from "next/image";
import styles from "./styles.module.scss";

const BackButton = () => {
  const handleClick = () => {};
  return (
    <div className={styles.backButton} onClick={handleClick}>
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
    </div>
  );
};
export default BackButton;
