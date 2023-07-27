import styles from "./styles.module.scss";

const Message = ({ children }) => {
  return (
    <div
      className={styles.message}
      style={{ borderRadius: `12px 12px 0 12px` }}
    >
      {children}
    </div>
  );
};
export default Message;
