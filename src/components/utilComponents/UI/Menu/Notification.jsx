import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

const Notification = () => {
  const [isProjects, setIsProjects] = useState(false);
  const activeMenuButton = useStore((state) => state.activeMenuButton);

  const [props, api] = useSpring(() => ({
    from: { opacity: 0 },
    config: { mass: 1, tension: 200, friction: 100 },
  }));

  useEffect(() => {
    if (activeMenuButton === "Projects") {
      setIsProjects(true);
      api.start({ opacity: 1 });
      const timeout = setTimeout(() => {
        api.start({ opacity: 0 });
      }, 500000);
      return () => clearTimeout(timeout);
    } else {
      setIsProjects(false);
      api.start({ opacity: 0 });
    }
  }, [activeMenuButton]);

  return (
    <animated.div
      className={styles.notification}
      style={{
        opacity: props.opacity.to((s) => `${s}`),
      }}
    >
      <p>Click on arrows to navigate through projects</p>
    </animated.div>
  );
};
export default Notification;
