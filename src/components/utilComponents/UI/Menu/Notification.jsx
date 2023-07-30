import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

const Notification = () => {
  const [countAboutMePlate, setCountAboutMePlate] = useState(0);
  const [countAboutMeHtml, setCountAboutMeHtml] = useState(0);
  const [countAboutMe, setCountAboutMe] = useState(0);
  const [countProjects, setCountProjects] = useState(0);
  const [text, setText] = useState("");
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const plateClicked = useStore((state) => state.plateClicked);
  const htmlClicked = useStore((state) => state.htmlClicked);
  const [props, api] = useSpring(() => ({
    from: { opacity: 0 },
    config: { mass: 0.1, tension: 200, friction: 50 },
  }));

  useEffect(() => {
    let timeout;

    if (countProjects === 0 && activeMenuButton === "Projects") {
      setCountProjects(1);
      setText("Click on arrows to navigate through projects");
      api.start({ opacity: 1 });
      timeout = setTimeout(() => {
        api.start({ opacity: 0 });
      }, 5000);
    } else if (
      countAboutMePlate === 0 &&
      plateClicked &&
      activeMenuButton === "About Me"
    ) {
      setCountAboutMePlate(1);
      setText("Click on arrows to navigate through about me pages");
      api.start({ opacity: 1 });
      timeout = setTimeout(() => {
        api.start({ opacity: 0 });
      }, 5000);
    } else if (
      countAboutMeHtml === 0 &&
      htmlClicked &&
      activeMenuButton === "About Me"
    ) {
      setCountAboutMeHtml(1);
      setText("Click on blub and zoom in to see more");
      api.start({ opacity: 1 });
      timeout = setTimeout(() => {
        api.start({ opacity: 0 });
      }, 5000);
    } else if (
      activeMenuButton === "About Me" &&
      plateClicked === false &&
      htmlClicked === false &&
      countAboutMe === 0
    ) {
      setCountAboutMe(1);
      setText("Click on image icon or text icon to move closer");
      api.start({ opacity: 1 });
      timeout = setTimeout(() => {
        api.start({ opacity: 0 });
      }, 5000);
    } else {
      api.start({ opacity: 0 });
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [activeMenuButton, plateClicked, htmlClicked]);

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
