import { memo, useCallback, useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import usePushAnimation from "../../Utils/usePushAnimation";
import { useFrame } from "@react-three/fiber";
import { useStore } from "@/stores/store";
import { Quaternion, Vector3 } from "three";
import HomeModel from "./models/HomeModel";
import { useMatcapTexture } from "@react-three/drei";
import AboutMeModel from "./models/AboutMeModel";
import ContactMeModel from "./models/ContactMeModel";
import ProjectModel from "./models/ProjectModel";

const ButtonIcon = ({ name, position }) => {
  const meshRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const activeButton = useStore((state) => state.activeButton);
  const setActiveButton = useStore((state) => state.setActiveButton);
  const setActiveFrame = useStore((state) => state.setActiveFrame);

  const [btnMatcap, btnUrl] = useMatcapTexture("8CAEBC_3A4443_506463_DAEFEF");

  const { scale, handleMouseEnter, handleMouseLeave } = useHoverAnimation();
  const { positionScaleZ, handlePointerDown, handlePointerUp } =
    usePushAnimation();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current?.geometry.computeBoundingBox();
      meshRef.current?.geometry.center();
      const offset = meshRef.current?.geometry.boundingBox
        .getCenter(new Vector3())
        .negate();
      meshRef.current?.position.add(offset);
    }
  }, []);

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

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setActiveButton({ name: name });
    setActiveFrame({ name: name });
  }, []);

  const handleMissed = useCallback(() => {
    setIsClicked(false);
  }, []);

  return (
    <a.mesh
      position={position}
      scale={scale}
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={(e) => handleClick(e)}
      onPointerMissed={handleMissed}
    >
      {name === "Home" && <HomeModel btnMatcap={btnMatcap} />}
      {name === "About Me" && <AboutMeModel btnMatcap={btnMatcap} />}
      {name === "Contact Me" && <ContactMeModel btnMatcap={btnMatcap} />}
      {name === "Project1" && <ProjectModel btnMatcap={btnMatcap} />}
    </a.mesh>
  );
};
export default memo(ButtonIcon);
