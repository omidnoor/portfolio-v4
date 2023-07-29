import { useStore } from "@/stores/store";
import Message from "./Message";
import styles from "./styles.module.scss";
import { BsRobot } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import Loader from "@/components/utilComponents/Loader/Loader";
import { useTransition, animated, config } from "react-spring";
import { useState } from "react";
import { useEffect } from "react";

const ChatTextArea = () => {
  const messages = useStore((state) => state.messages);
  const isChatLoading = useStore((state) => state.isChatLoading);
  const [noMessages, setNoMessages] = useState(false);

  useEffect(() => {
    if (messages.length === 1) {
      setNoMessages(true);
    } else {
      setNoMessages(false);
    }
  });
  console.log(messages.length);
  const transitions = useTransition(messages, {
    from: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 50 },
    config: config.wobbly,
  });

  return (
    <div className={styles.textarea}>
      {isChatLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {noMessages && (
        <div className={styles.noMessages}>
          <p>👋 Hello! I'm Omid's assistant bot.</p>
          <p>
            I can provide information about his skills, projects, experiences,
            and much more.
          </p>
          <p>Feel free to ask me anything about Omid!</p>
          <p>
            However, please note that while I strive for accuracy, there may be
            some discrepancies.
          </p>
        </div>
      )}
      {transitions((props, message, index) =>
        message.content ? (
          <animated.div
            className={styles.container}
            style={{
              opacity: props.opacity.to((opacity) => opacity),
              transform: props.y.to((y) => `translate3d(0,${y}px,0)`),
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
          </animated.div>
        ) : null,
      )}
    </div>
  );
};
export default ChatTextArea;
