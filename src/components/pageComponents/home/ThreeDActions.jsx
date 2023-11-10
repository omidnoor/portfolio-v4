import { useStore } from "@/stores/store";
import {
  GradientTexture,
  MeshDistortMaterial,
  Text,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { a } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "next/router";

const AnimatedMaterial = a(MeshDistortMaterial);

const ThreeDActions = () => {
  const router = useRouter();
  const serviceRef = useRef();
  const lestTalkRef = useRef();
  const [letsTalkHovered, setLetsTalkHovered] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);
  useCursor(letsTalkHovered);
  useCursor(servicesHovered);

  const {
    setIsLetsTalk,
    setIsServices,
    isLetsTalk,
    isServices,
    setActiveMenuButton,
  } = useStore((state) => state);

  useFrame(() => {
    lestTalkRef.current.distort = THREE.MathUtils.lerp(
      lestTalkRef.current.distort,
      letsTalkHovered ? 0.4 : 0,
      letsTalkHovered ? 0.05 : 0.01,
    );
    serviceRef.current.distort = THREE.MathUtils.lerp(
      serviceRef.current.distort,
      servicesHovered ? 0.4 : 0,
      servicesHovered ? 0.05 : 0.01,
    );
  });

  useEffect(() => {
    if (isLetsTalk) {
      setActiveMenuButton("Contact Me");
      window.parent.postMessage({
        type: "updateState",
        payload: "Contact Me",
      });
      router.push("/PageContactMe");
      setIsLetsTalk(false);
    }
    if (isServices) {
      setActiveMenuButton("About Me");
      window.parent.postMessage({
        type: "updateState",
        payload: "About Me",
      });
      setIsServices(false);
    }
    document.activeElement.blur();
  }, [isLetsTalk, isServices]);
  return (
    <group position={[0, -20, 0]} rotation={[0, 0, 0]}>
      <a.mesh
        position={[-30, -10, 0]}
        scale={30}
        onClick={(e) => {
          setIsLetsTalk(true);
        }}
        onPointerOver={() => setLetsTalkHovered(true)}
        onPointerOut={() => setLetsTalkHovered(false)}
      >
        <Text font="/Inter-Bold.woff" color="#0c020e" fontSize={0.2}>
          Let's Talk
        </Text>
        <planeGeometry args={[1.2, 0.4, 32, 32]} position={[0, 0, 0]} />

        <AnimatedMaterial ref={lestTalkRef} speed={5}>
          <GradientTexture
            stops={[0, 0.3, 0.6, 1]}
            colors={["#ffc800", "#ffc800", "#ffc800", "#ffc800"]}
            size={100}
          />
        </AnimatedMaterial>
      </a.mesh>
      <a.mesh
        position={[30, -10, 0]}
        scale={30}
        onClick={(e) => {
          setIsServices(true);
        }}
        onPointerOver={() => setServicesHovered(true)}
        onPointerOut={() => setServicesHovered(false)}
      >
        <Text font="/Inter-Bold.woff" color="#0c020e" fontSize={0.2}>
          Services
        </Text>
        <planeGeometry args={[1.2, 0.4, 32, 32]} position={[0, 0, 0]} />
        <AnimatedMaterial ref={serviceRef} speed={5}>
          <GradientTexture
            stops={[0, 0.2, 0.8, 1]}
            colors={["#ffd0ff", "#ffd0ff", "#ffd0ff", "#ffd0ff"]}
            size={100}
          />
        </AnimatedMaterial>
      </a.mesh>
    </group>
  );
};
export default ThreeDActions;
