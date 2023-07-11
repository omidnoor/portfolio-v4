import Image from "next/image";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useWindowResize } from "@/components/3d/UI/DockFrames/Hooks/useWindowResize";
import { pages } from "@/stores/data";

const ProjectPrev = () => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  useWindowResize((innerWidth, innerHeight) => {
    setWidth(innerWidth * 0.16);
    setHeight(innerHeight * 0.3);
  });
  return (
    <div className={styles.projectPrev}>
      {pages[4].sub.map((item, index) => (
        <Image key={index} src={item.imageUrl} width={160} height={200} />
      ))}
    </div>
  );
};
export default ProjectPrev;
