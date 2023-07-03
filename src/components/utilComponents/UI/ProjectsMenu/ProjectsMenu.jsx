import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";
import { useSpringValue } from "react-spring";
import { useEffect } from "react";
import { animated } from "react-spring";
import ProjectPrev from "./ProjectPrev";

const ProjectsMenu = () => {
  const activeMenuButton = useStore((state) => state.activeMenuButton);

  const projectX = useSpringValue(0, {
    from: 0,
    config: { mass: 2, tension: 100, friction: 20 },
  });

  useEffect(() => {
    if (activeMenuButton === "Projects") {
      projectX.start(0);
    } else {
      projectX.start(-200);
    }
  }, [activeMenuButton]);

  return (
    <animated.div className={styles.container} style={{ left: projectX }}>
      <div className={styles.projectsMenu}>
        <h2>Projects</h2>
        <ProjectPrev />
      </div>
    </animated.div>
  );
};
export default ProjectsMenu;
