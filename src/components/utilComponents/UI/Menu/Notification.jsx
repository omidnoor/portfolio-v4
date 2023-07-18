import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

const Notification = () => {
  const [text, setText] = useState("");
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const plateClicked = useStore((state) => state.plateClicked);

  const [props, api] = useSpring(() => ({
    from: { opacity: 0 },
    config: { mass: 0.1, tension: 200, friction: 50 },
  }));

  useEffect(() => {
    if (activeMenuButton === "Projects") {
      setText("Click on arrows to navigate through projects");
      api.start({ opacity: 1 });
      const timeout = setTimeout(() => {
        api.start({ opacity: 0 });
      }, 5000);
      return () => clearTimeout(timeout);
    } else {
      api.start({ opacity: 0 });
    }
  }, [activeMenuButton]);
  console.log(plateClicked);
  useEffect(() => {
    if (plateClicked && activeMenuButton === "About Me") {
      setText("Click on arrows to navigate through about me pages");
      api.start({ opacity: 1 });
      const timeout = setTimeout(() => {
        api.start({ opacity: 0 });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [activeMenuButton, plateClicked]);

  return (
    <animated.div
      className={styles.notification}
      style={{
        opacity: props.opacity.to((s) => `${s}`),
      }}
    >
      <p>{text}</p>
    </animated.div>
  );
};
export default Notification;
