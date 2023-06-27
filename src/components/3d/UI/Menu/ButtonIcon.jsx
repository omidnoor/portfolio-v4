import { memo, useCallback, useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import usePushAnimation from "../../Utils/usePushAnimation";
import { useFrame } from "@react-three/fiber";
import { useStore } from "@/stores/store";
import { Quaternion } from "three";
import HomeModel from "./models/HomeModel";
import { useMatcapTexture } from "@react-three/drei";
import AboutMeModel from "./models/AboutMeModel";
import ContactMeModel from "./models/ContactMeModel";
import ProjectModel from "./models/ProjectModel";

const ButtonIcon = ({ id, position, targetPosition }) => {
  const meshRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const setActiveButton = useStore((state) => state.setActiveButton);

  const [btnMatcap, btnUrl] = useMatcapTexture("8CAEBC_3A4443_506463_DAEFEF");

  const { scale, handleMouseEnter, handleMouseLeave } = useHoverAnimation();
  const { positionScaleZ, handlePointerDown, handlePointerUp } =
    usePushAnimation();

  useFrame(() => {
    if (isHovered && meshRef) {
      meshRef.current.position.z = (1 - positionScaleZ.get()) * position[2];
    }
  });

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  const handlePointerEnter = useCallback(() => {
    handleMouseEnter();
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    handleMouseLeave();
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    setActiveButton(id, targetPosition);
  }, [id, targetPosition]);

  const handleMissed = useCallback(() => {
    setIsClicked(false);
  }, []);

  return (
    <group>
      <a.mesh
        position={position}
        scale={[scale.get(), scale.get(), scale.get()]}
        ref={meshRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        onPointerMissed={handleMissed}
      >
        {id === "Home" && <HomeModel btnMatcap={btnMatcap} />}
        {id === "About Me" && <AboutMeModel btnMatcap={btnMatcap} />}
        {id === "Contact Me" && <ContactMeModel btnMatcap={btnMatcap} />}
        {id === "Project1" && <ProjectModel btnMatcap={btnMatcap} />}
      </a.mesh>
    </group>
  );
};
export default memo(ButtonIcon);
