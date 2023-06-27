import usePushAnimation from "@/components/3d/Utils/usePushAnimation";
import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import { useStore } from "@/stores/store";
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";

const RightLeftArrow = ({ matcap, rotation, position }) => {
  const meshRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const setActiveButton = useStore((state) => state.setActiveButton);
  const activeFrame = useStore((state) => state.activeFrame);

  const [btnMatcap, btnUrl] = useMatcapTexture("8CAEBC_3A4443_506463_DAEFEF");

  const { scale, handleMouseEnter, handleMouseLeave } = useHoverAnimation();
  const { positionScaleZ, handlePointerDown, handlePointerUp } =
    usePushAnimation();

  useFrame(() => {
    if (isHovered && meshRef) {
      meshRef.current.position.z = (positionScaleZ.get() - 0.1) * position[2];
    }
    if (meshRef) meshRef.current.scale.z = 0.1;
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

  const handleMissed = useCallback(() => {
    setIsClicked(false);
  }, []);

  const { nodes } = useGLTF("./models/arrow.glb");

  const handleClick = () => {
    if (activeFrame.name === "Project1") {
      if (project > 6) return;
      if (!project) return;
      if (project === 1) {
        setProject((prev) => prev + 1);
      }
    }
  };

  return (
    <a.mesh
      scale={scale}
      geometry={nodes.uploads_files_2310869_UI_Icons085.geometry}
      position={position}
      rotation={rotation}
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onPointerMissed={handleMissed}
    >
      <meshMatcapMaterial matcap={matcap} />
    </a.mesh>
  );
};
export default memo(RightLeftArrow);
