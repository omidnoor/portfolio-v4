import styles from "./styles.module.scss";
import { useSpring, animated, config } from "react-spring";

const Message = ({ children, role }) => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    // y: isChatClicked ? 0 : 500,
    config: config.stiff,
  });

  return (
    <animated.div
      className={styles.message}
      style={{
        borderRadius: `12px 12px 0 12px`,
        backgroundColor: role === "user" ? "#FFee88" : "#FFff88",
        ...props,
      }}
    >
      {children}
    </animated.div>
  );
};
export default Message;
