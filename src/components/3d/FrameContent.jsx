import React, { memo, useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";

import styles from "./content-embed.module.scss";
import { Html } from "@react-three/drei";
import { useStore } from "@/stores/store";
import { Deep_Blue } from "../utilComponents/variables/colors";
import { Suspense } from "react";
import { normals } from "./Utils/Normals";
import { pages } from "@/stores/data";
import { worldScale } from "@/stores/variables";

const componentMapping = {
  Home: React.lazy(() => import("@/pages/PageHome")),
  AboutMe: React.lazy(() => import("@/pages/PageAboutMe")),
  ContactMe: React.lazy(() => import("@/pages/PageContactMe")),
  Projects: React.lazy(() => import("@/pages/PageProjects")),
};

const FrameContent = ({ props, frameRef }) => {
  const activeFrames = useStore((state) => state.activeFrames);
  const geoNormalArray = useStore((state) => state.geoNormalArray);
  const setGeoNormalArray = useStore((state) => state.setGeoNormalArray);
  const transitions = useTransition(activeFrames.includes(props.name), {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { tension: 1, friction: 1 },
  });

  console.log(frameRef);
  useEffect(() => {
    if (frameRef.current) {
      const normal = normals(frameRef.current);
      const exists = geoNormalArray.some((item) => item.name === props.name);
      if (!exists) {
        setGeoNormalArray(props.name || pages.name, normal);
      }
    }
  }, []);

  return (
    <Html
      // scale={worldScale}
      position={[0, 0, 2.05]}
      wrapperClass={styles.wrapper}
      transform
      occlude
    >
      <h1>{props.name}</h1>
      <div className={styles.main} name={props.name}>
        {/* <iframe src={props.url} /> */}
      </div>
    </Html>
  );
};
export default FrameContent;
