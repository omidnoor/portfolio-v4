import ChatButton from "./ChatButton";
import ChatMessageArea from "./ChatMessageArea";
import styles from "./styles.module.scss";

const ChatContainer = () => {
  return (
    <div className={styles.container}>
      <ChatButton />
      <ChatMessageArea />
    </div>
  );
};
export default ChatContainer;
