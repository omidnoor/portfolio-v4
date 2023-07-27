import ChatDots from "./ChatDots";
import styles from "./styles.module.scss";
import { BsRobot } from "react-icons/bs";

const ChatHeder = () => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.avatar}>
        <BsRobot size={24} />
      </div>
      <p>Chat Bot</p>
      <ChatDots />
    </div>
  );
};
export default ChatHeder;
