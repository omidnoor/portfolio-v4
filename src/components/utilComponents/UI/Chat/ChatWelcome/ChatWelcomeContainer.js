import ExampleQuestions from "./ExampleQuestions";
import styles from "./styles.module.scss";

const ChatWelcomeContainer = () => {
  return (
    <div className={styles.noMessages}>
      <p>👋 Hello! I'm Memoai, Omid's assistant bot.</p>
      <p>
        I can provide information about Omid's skills, projects, experiences,
        and much more.
      </p>
      <ExampleQuestions />
    </div>
  );
};
export default ChatWelcomeContainer;
