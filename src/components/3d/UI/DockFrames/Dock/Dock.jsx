import styles from "./styles.module.scss";

export const Dock = ({ children }) => {
  return <div className={styles.dock}>{children}</div>;
};
