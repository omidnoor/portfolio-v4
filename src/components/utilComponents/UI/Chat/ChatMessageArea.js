import { useStore } from "@/stores/store";
import ChatHeder from "./ChatHeder";
import styles from "./styles.module.scss";
import { useSpring, animated, config } from "react-spring";
import ChatTextArea from "./ChatTextArea";

const ChatMessageArea = () => {
  const setIsChatClicked = useStore((state) => state.setIsChatClicked);
  const isChatClicked = useStore((state) => state.isChatClicked);

  const props = useSpring({
    opacity: isChatClicked ? 1 : 0,
    y: isChatClicked ? 0 : 70,
    config: config.stiff,
  });
  return (
    <animated.div
      className={styles.messageContainer}
      style={{
        transform: props.y.to((y) => `translate3d(0,${y}px,0)`),
        opacity: props.opacity.to((opacity) => opacity),
        zIndex: -1,
      }}
    >
      <ChatHeder />
      <ChatTextArea />
    </animated.div>
  );
};
export default ChatMessageArea;
