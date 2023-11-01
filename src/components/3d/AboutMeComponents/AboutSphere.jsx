import {
  ContactShadows,
  Environment,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSpring } from "react-spring";
import * as THREE from "three";
import { a } from "@react-spring/three";
import { useStore } from "@/stores/store";

const AnimatedMaterial = a(MeshDistortMaterial);

const AboutSphere = ({
  setBg,
  wordColor,
  colors,
  activeMenuButton,
  setActiveMenuButton,
}) => {
  const { mode, setMode } = useStore((state) => state);

  const sphere = useRef();
  const light = useRef();
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
  }, [hovered]);

  useFrame((state) => {
    light.current.position.x = state.mouse.x * 20;
    light.current.position.y = state.mouse.y * 20;
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(
        sphere.current.position.x,
        hovered ? state.mouse.x / 2 : 0,
        0.2,
      );
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 +
          (hovered ? state.mouse.y / 2 : 0),
        0.2,
      );
    }
  });

  // const [{ wobble, coat, color, ambient, env }] = useSpring(
  //   {
  //     wobble: down ? 13 : hovered ? 13.8 : 13,
  //     coat: mode && !hovered ? 0.4 : 1,
  //     ambient: !mode && !hovered ? 0.7 : 1,
  //     env: !mode && !hovered ? 0.4 : 15,
  //     color: hovered ? "#F8C099" : mode ? "#F8C099" : "#F8C033",
  //     config: (n) =>
  //       n === "wobble" && hovered && { mass: 3, tension: 100, friction: 1 },
  //   },
  //   [mode, hovered, down],
  // );

  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: down ? 17 : hovered ? 15 : 14,
      coat: mode && !hovered ? 0.04 : 1,
      ambient: mode && !hovered ? 1.5 : 0.5,
      env: mode && !hovered ? 0.4 : 1,
      color: hovered ? "#E8B059" : mode ? "#E8B009" : "white",
      config: (n) =>
        n === "wobble" && hovered && { mass: 2, tension: 1000, friction: 10 },
    },
    [mode, hovered, down],
  );

  return (
    <>
      <a.ambientLight intensity={ambient} />
      <a.pointLight
        ref={light}
        position-z={-15}
        intensity={env}
        color="#F8C069"
      />
      <Suspense fallback={null}>
        <a.mesh
          ref={sphere}
          scale={wobble}
          position={[0, 0, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
          }}
          onPointerDown={() => setDown(true)}
          onPointerUp={() => {
            setDown(false);
            setMode(!mode);
            // setBg({
            //   background: !mode ? "#0000ff10" : colors.background,
            //   fill: !mode ? "#34000010" : colors.background,
            //   wordColor: {
            //     tech: !mode ? "#dcfcff" : colors.wordColors.tech,
            //     education: !mode ? "#ced" : colors.wordColors.education,
            //     general: !mode ? "#52affc" : colors.wordColors.general,
            //   },
            // });
            setBg({
              background: !mode ? "#202020" : "#f0f0f0",
              fill: !mode ? "#f0f0f0" : "#202020",
            });
          }}
        >
          {/* <OrbitControls /> */}
          <sphereGeometry args={[1, 64, 64]} />
          <AnimatedMaterial
            color={color}
            envMapIntensity={env}
            clearcoat={coat}
            clearcoatRoughness={0}
            metalness={0.1}
          />
          <Environment preset="warehouse" />
          {/* <ContactShadows
            color="#000000"
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.3, 0]}
            // opacity={mode ? 0.8 : 0.4}
            width={12}
            height={12}
            // blur={0.2}
            // far={1.6}
          /> */}
        </a.mesh>
      </Suspense>
    </>
  );
};
export default AboutSphere;
