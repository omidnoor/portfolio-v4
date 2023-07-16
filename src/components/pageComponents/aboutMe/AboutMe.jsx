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

const colors = {
  background: "#000000",
  fill: "#ffffff",
  wordColors: {
    tech: "#2dbbf0",
    education: "#02ff10",
    general: "#006239",
  },
};

const AboutMe = () => {
  const [{ background, fill, wordColor }, set] = useSpring(
    {
      background: colors.background,
      fill: colors.fill,
      wordColor: colors.wordColors,
    },
    [],
  );

  return (
    <Suspense fallback={<CustomLoader />}>
      <a.div
        style={{
          background,
          margin: "0",
          padding: "0",
          width: "100%",
          height: "100%",
        }}
      >
        <Canvas
          // colorManagement
          dpr={[1, 2]}
          camera={{ position: [0, 0, 125], fov: 100 }}
        >
          <ambientLight intensity={1} />
          <AboutCloud count={15} radius={60} wordColor={wordColor} />
          <AboutSphere setBg={set} wordColor={wordColor} colors={colors} />
          <TrackballControls />
          <AboutMeEffect />
        </Canvas>
      </a.div>
    </Suspense>
  );
};
export default AboutMe;
