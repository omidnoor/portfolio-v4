import React, { memo, useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";

import styles from "./content-embed.module.scss";
import { Html } from "@react-three/drei";
import { useStore } from "@/stores/store";
import { Deep_Blue } from "../utilComponents/variables/colors";

const componentMapping = {
  Home: React.lazy(() => import("@/pages/PageHome")),
  AboutMe: React.lazy(() => import("@/pages/PageAboutMe")),
  ContactMe: React.lazy(() => import("@/pages/PageContactMe")),
  Projects: React.lazy(() => import("@/pages/PageProjects")),
};

const FrameContent = ({ props }) => {
  const [isActiveFrame, setIsActiveFrame] = useState(false);

  const activeFrame = useStore((state) => state.activeFrame);
  const setHoverHtml = useStore((state) => state.setHoverHtml);
  const transitions = useTransition(isActiveFrame, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { tension: 100, friction: 100 },
  });

  useEffect(() => {
    if (activeFrame.name === props.name) {
      setIsActiveFrame(true);
    } else {
      setIsActiveFrame(false);
    }
  }, [activeFrame]);

  return (
    <mesh position={[0, 0, 0.05]}>
      <Html scale={0.1} wrapperClass={styles.wrapper} transform sprite occlude>
        {transitions((style, item) =>
          item ? (
            <React.Suspense fallback={<div>Loading...</div>}>
              <animated.div
                className={styles.main}
                name={props.name}
                onMouseEnter={() => {
                  setHoverHtml(true);
                }}
                onMouseLeave={() => {
                  setHoverHtml(false);
                }}
                style={{
                  ...style,
                  width: "688px",
                  height: "890px",
                  padding: 0,
                  margin: 0,
                  overflow: "hidden",
                  backgroundColor: Deep_Blue,
                }}
              >
                <iframe src={props.url} width="30px" height="60px" />
                {/* {ComponentToRender && <ComponentToRender />} */}
              </animated.div>
            </React.Suspense>
          ) : null,
        )}
        {/* {!isActiveFrame && <Image src={props.url} fill alt="image" />} */}
      </Html>
    </mesh>
  );
};
export default memo(FrameContent);
