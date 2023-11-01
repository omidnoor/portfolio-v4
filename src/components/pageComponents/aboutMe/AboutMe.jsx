import AboutCloud from "@/components/3d/AboutMeComponents/AboutCloud";
import AboutMeEffect from "@/components/3d/AboutMeComponents/AboutMeEffect";
import AboutSphere from "@/components/3d/AboutMeComponents/AboutSphere";
import Effect from "@/components/effect/Effect";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";
import { a } from "@react-spring/web";

import {
  Environment,
  TrackballControls,
  useEnvironment,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useSpring } from "react-spring";
import Services from "./Services";
import styles from "./aboutme.module.scss";

const colors = {
  background: "#ffffff00",
  fill: "#ffffff",
  wordColors: {
    tech: "#2dbbf0",
    education: "#02ff10",
    general: "#006239",
  },
};

const AboutMe = ({ style }) => {
  const [{ background, fill, wordColor }, set] = useSpring(
    {
      background: colors.background,
      fill: colors.fill,
      wordColor: colors.wordColors,
    },
    [],
  );

  return (
    // <Suspense fallback={<CustomLoader />}>
    <a.div className={styles.container}>
      <Services />
    </a.div>
    // </Suspense>
  );
};
export default AboutMe;
