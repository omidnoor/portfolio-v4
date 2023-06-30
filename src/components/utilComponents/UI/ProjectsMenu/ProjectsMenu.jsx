import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";
import { useSpringValue } from "react-spring";
import { useEffect } from "react";
import { animated } from "react-spring";

const ProjectsMenu = () => {
  const activeMenuButton = useStore((state) => state.activeMenuButton);

  const projectX = useSpringValue(0, {
    from: 0,
    config: { mass: 2, tension: 100, friction: 20 },
  });

  useEffect(() => {
    if (activeMenuButton === "Project1") {
      projectX.start(-5);
    } else {
      projectX.start((-20 / 100) * window.innerWidth);
    }
  }, [activeMenuButton]);
  return (
    <animated.div className={styles.container} style={{ left: projectX }}>
      <div className={styles.projectsMenu}>
        <h2>Projects</h2>
      </div>
    </animated.div>
  );
};
export default ProjectsMenu;
