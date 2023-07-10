import { animated, useSpringValue } from "@react-spring/web";
import { clamp } from "@react-spring/shared";

import { useWindowResize } from "../Hooks/useWindowResize";

import { DockContext } from "./DockContext";

import styles from "./styles.module.scss";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";

export const DOCK_ZOOM_LIMIT = [-100, 50];

export const Dock = ({ children }) => {
  return <div className={styles.dock}>{children}</div>;
};
