import styles from "./home.module.scss";
import HomeCard from "../home/HomeCard";
import { memo, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import AboutSphere from "@/components/3d/AboutMeComponents/AboutSphere";
import { useSpring, animated } from "react-spring";
import { a } from "@react-spring/web";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useStore } from "@/stores/store";
import AboutCloud from "@/components/3d/AboutMeComponents/AboutCloud";
import ThreeDActions from "./ThreeDActions";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const colors = {
  background: "#ffffff00",
  fill: "#ffffff",
  wordColors: {
    tech: "#f05fff",
    education: "#02ff10",
    general: "#006239",
  },
};

const Home = () => {
  const { mode } = useStore((state) => state);
  const cameraRef = useRef();

  const cardSpring = useSpring({
    from: {
      opacity: 1,
      transform: "translateY(0%)",
    },
    to: {
      opacity: !mode ? 1 : 0,
      transform: !mode ? "translateY(0%)" : "translateY(-100%)",
    },
    config: { mass: 1, tension: 1000, friction: 60 },
  });

  useEffect(() => {
    if (cameraRef?.current) {
      cameraRef.current.position.x = !mode ? -0 : 0;
      cameraRef.current.position.y = !mode ? -0 : 0;
      cameraRef.current.position.z = 110;
      cameraRef.current.lookAt(0, 0, 0);
      cameraRef.current.updateProjectionMatrix();
    }
  }, [mode]);

  const [{ background, fill, wordColor }, set] = useSpring(
    {
      background: colors.background,
      fill: colors.fill,
      wordColor: colors.wordColors,
    },
    [],
  );

  return (
    <div className={`${styles.homeSection}`}>
      <a.div
        className={styles.card}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Canvas flat={mode} linear style={{ backgroundColor: background }}>
          {/* <EffectComposer>
            <Bloom
              intensity={2}
              luminanceThreshold={0.5}
              luminanceSmoothing={1}
              height={300}
            />
          </EffectComposer> */}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 100]}
            ref={cameraRef}
            fov={52}
            near={0.1}
            far={1000}
          />
          {mode && (
            <AboutCloud
              count={5}
              radius={40}
              wordColor={wordColor}
              colors={colors}
            />
          )}
          <AboutSphere setBg={set} wordColor={wordColor} colors={colors} />
          {!mode && <ThreeDActions />}
          {/* <AboutMeEffect /> */}
          {mode && <OrbitControls noZoom={!mode} enabled={mode} />}
        </Canvas>
      </a.div>
      <animated.div style={cardSpring}>
        <HomeCard />
      </animated.div>
    </div>
  );
};
export default memo(Home);
