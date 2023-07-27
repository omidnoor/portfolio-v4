import { useStore } from "@/stores/store";
import Message from "./Message";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useSpring, animated, config } from "react-spring";

const ChatTextArea = () => {
  const messages = useStore((state) => state.messages);

  return (
    <animated.div className={styles.textarea}>
      {!!messages &&
        messages.length > 0 &&
        messages.map(
          (message, index) =>
            message.content && <Message key={index}>{message.content}</Message>,
        )}
    </animated.div>
  );
};
export default ChatTextArea;
