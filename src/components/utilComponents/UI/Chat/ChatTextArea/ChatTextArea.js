import { useStore } from "@/stores/store";
import Message from "./Message";
import styles from "./styles.module.scss";
import { BsRobot } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import Loader from "@/components/utilComponents/Loader/Loader";
import { useTransition, animated, config } from "react-spring";
import { useState } from "react";
import { useEffect } from "react";
import ChatWelcomeContainer from "../ChatWelcome/ChatWelcomeContainer";
import Image from "next/image";

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
  // console.log(messages.length);
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
      {noMessages && <ChatWelcomeContainer />}
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
                <Image
                  src="/icons/robot-v1.jpg"
                  width={32}
                  height={32}
                  alt="chatbot"
                />{" "}
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
