import DOMPurify from "dompurify";
import styles from "./styles.module.scss";
import { useSpring, animated, config } from "react-spring";

const Message = ({ children, role }) => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.stiff,
  });
  const safeHTML = DOMPurify.sanitize(children);

  return (
    <animated.div
      className={styles.message}
      style={{
        borderRadius: `${
          role === "user" ? "32px 32px 0 32px" : "32px 32px 32px 0"
        }`,
        backgroundColor: role === "user" ? "#FFffef" : "#FFffff",
        ...props,
      }}
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
};
export default Message;
