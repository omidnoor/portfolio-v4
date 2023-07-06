import styles from "./styles.module.scss";

export const DockDivider = () => {
  return (
    <div className={styles.divider__container}>
      <span className={styles.divider}></span>
    </div>
  );
};
