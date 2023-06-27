import usePushAnimation from "@/components/3d/Utils/usePushAnimation";
import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import { useStore } from "@/stores/store";
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";

const RightLeftArrow = ({ matcap, rotation, position }) => {
  const { nodes } = useGLTF("./models/arrow.glb");
  const meshRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const activeFrame = useStore((state) => state.activeFrame);
  const setActiveFrame = useStore((state) => state.setActiveFrame);
  const project = useStore((state) => state.project);
  const setProject = useStore((state) => state.setProject);

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
    // if (!activeFrame.name) setProject(1);
    // if (activeFrame.name === "Project1") setProject(1);
  }, [activeFrame]);

  console.log(activeFrame.name, project);
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

  const handleClick = () => {
    setIsClicked(true);
    if (!activeFrame.name) return;
    if (activeFrame.name.includes("Project")) {
      if (project > 6) {
        setActiveFrame("Project1");
        setProject(1);
      }
      if (project < 1) return;
      console.log(project);
      if (position[0] > 0 && project <= 6) setProject(project + 1);
      if (position[0] > 0 && project === 6) setProject(1);
      if (position[0] < 0 && project > 1) {
        setProject(project - 1);
        // setActiveFrame(`Project${project}`);
      }
      if (position[0] < 0 && project === 1) {
        // setActiveFrame(`Project6`);
        setProject(6);
      }
    }
  };

  return (
    <a.mesh
      scale={scale}
      transparent={true}
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
