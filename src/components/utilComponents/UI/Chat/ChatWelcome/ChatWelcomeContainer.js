import styles from "./styles.module.scss";

const ChatWelcomeContainer = () => {
  return (
    <div className={styles.noMessages}>
      <p>👋 Hello! I'm Memoai, Omid's assistant bot.</p>
      <p>
        I can provide information about Omid's skills, projects, experiences,
        and much more.
      </p>
      <p>Feel free to ask me anything about him!</p>
      <p>
        However, please note that while I strive for accuracy, there may be some
        discrepancies.
      </p>
    </div>
  );
};
export default ChatWelcomeContainer;
