import { useStore } from "@/stores/store";
import Message from "./Message";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { BsRobot } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

const ChatTextArea = () => {
  const messages = useStore((state) => state.messages);
  console.log(messages);
  return (
    <animated.div className={styles.textarea}>
      {!!messages &&
        messages.length > 0 &&
        messages.map(
          (message, index) =>
            message.content && (
              <div
                className={styles.container}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "6px",
                  flexDirection:
                    message.role === "assistant" ? "row-reverse" : "row",
                }}
              >
                <div className={styles.messageWrapper}>
                  <Message role={message.role} key={index}>
                    {message.content}
                  </Message>
                </div>
                {message.role === "assistant" && (
                  <div className={styles.avatar}>
                    <BsRobot size={24} />
                  </div>
                )}
                {message.role === "user" && (
                  <div className={styles.avatar}>
                    <AiOutlineUser size={24} />
                  </div>
                )}
              </div>
            ),
        )}
    </animated.div>
  );
};
export default ChatTextArea;
