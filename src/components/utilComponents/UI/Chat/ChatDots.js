import styles from "./styles.module.scss";

const ChatDots = () => {
  return (
    <div className={styles.dots}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
};
export default ChatDots;
