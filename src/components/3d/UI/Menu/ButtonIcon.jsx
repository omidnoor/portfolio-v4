import { memo, useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import usePushAnimation from "../../Utils/usePushAnimation";
import { useFrame } from "@react-three/fiber";
import { useStore } from "@/stores/store";
import { Quaternion } from "three";
import HomeModel from "./models/HomeModel";
import {
  Center,
  MeshReflectorMaterial,
  RoundedBox,
  useMatcapTexture,
} from "@react-three/drei";
import AboutMeModel from "./models/AboutMeModel";
import ContactMeModel from "./models/ContactMeModel";
import ProjectModel from "./models/ProjectModel";

const ButtonIcon = ({
  id,
  position,
  targetPosition,
  targetQuaternion = new Quaternion(0, 0, 0, 1),
}) => {
  const meshRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const setActiveButton = useStore((state) => state.setActiveButton);

  const [btnMatcap, btnUrl] = useMatcapTexture("685B57_BEB1B1_9B99A4_1E1D1D");

  const { scale, handleMouseEnter, handleMouseLeave } = useHoverAnimation();
  const { positionScaleZ, handlePointerDown, handlePointerUp } =
    usePushAnimation();

  useFrame((state, delta) => {
    if (isHovered && meshRef) {
      meshRef.current.position.z = positionScaleZ.get() * position[2];
    }
  });

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  return (
    <a.mesh
      position={position}
      scale={scale}
      ref={meshRef}
      onPointerEnter={() => {
        handleMouseEnter();
        setIsHovered(true);
      }}
      onPointerLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={() => setActiveButton(id, targetPosition)}
      onPointerMissed={() => setIsClicked(false)}
    >
      {/* <RoundedBox
        args={[0.1, 0.1, 0.01]}
        radius={0.01}
        smoothness={1}
        creaseAngle={0.1}
      >
        <MeshReflectorMaterial castShadow receiveShadow />
      </RoundedBox> */}
      {id === "Home" && <HomeModel btnMatcap={btnMatcap} />}
      {id === "About Me" && <AboutMeModel btnMatcap={btnMatcap} />}
      {id === "Contact Me" && <ContactMeModel btnMatcap={btnMatcap} />}
      {id === "Project1" && <ProjectModel btnMatcap={btnMatcap} />}
    </a.mesh>
  );
};
export default memo(ButtonIcon);
