import { useWindowResize } from "@/components/3d/UI/DockFrames/Hooks/useWindowResize";
import DockMenu, { DockFrames } from "@/components/3d/UI/DockFrames/";
import { memo, useRef } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";

const Menu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <DockMenu />
      </div>
    </div>
  );
};
export default memo(Menu);
