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
        borderRadius: `${
          role === "user" ? "32px 32px 0 32px" : "32px 32px 32px 0"
        }`,
        backgroundColor: role === "user" ? "#FFee88" : "#FFff88",
        ...props,
      }}
    >
      {children}
    </animated.div>
  );
};
export default Message;
