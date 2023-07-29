import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";
import { useSpring, animated, config } from "react-spring";
import Image from "next/image";

const ChatButton = () => {
  const setIsChatClicked = useStore((state) => state.setIsChatClicked);
  const isChatClicked = useStore((state) => state.isChatClicked);

  const props = useSpring({
    transform: isChatClicked ? "rotate(-90deg)" : "rotate(0deg)",
    config: config.stiff,
  });

  const handleClick = () => {
    if (isChatClicked) {
      setIsChatClicked(false);
    } else {
      setIsChatClicked(true);
    }
  };

  return (
    <animated.div
      className={styles.chatButton}
      onClick={handleClick}
      style={{ borderRadius: `50% 50% 0 50%`, ...props }}
    >
      {!isChatClicked && (
        <Image src="/icons/chat.png" alt="Chat" width={30} height={30} />
      )}
      {isChatClicked && (
        <Image src="/icons/close.png" alt="Chat" width={30} height={30} />
      )}
    </animated.div>
  );
};
export default ChatButton;
