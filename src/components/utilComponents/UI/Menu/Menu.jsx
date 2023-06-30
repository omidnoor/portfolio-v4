import { useWindowResize } from "@/components/3d/UI/DockFrames/Hooks/useWindowResize";
import DockMenu, { DockFrames } from "@/components/3d/UI/DockFrames/";
import { memo, useRef } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";

const Menu = () => {
  const meshRef = useRef();
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  useWindowResize((innerWidth, innerHeight) => {
    setWidth(Math.max(innerWidth * 0.013, 10));
    setHeight(innerHeight * 0.002);
  });

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <DockMenu />
      </div>
    </div>
  );
};
export default memo(Menu);
