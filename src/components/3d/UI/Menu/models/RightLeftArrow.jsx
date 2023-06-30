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
  const [projectNum, setProjectNum] = useState(1);

  const activeFrame = useStore((state) => state.activeFrame);
  const setActiveFrame = useStore((state) => state.setActiveFrame);
  const project = useStore((state) => state.project);
  const setProject = useStore((state) => state.setProject);
  const setActiveButton = useStore((state) => state.setActiveButton);

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

  const handleClick = useCallback(() => {
    setIsClicked(true);

    if (!activeFrame.name || !activeFrame.name.includes("Project")) return;

    // Calculate the new project number based on the current position and project
    const newProject =
      position[0] > 0
        ? project < 6
          ? project + 1
          : 1
        : project > 1
        ? project - 1
        : 6;

    // Set the new project number in the global state
    setProject(newProject);

    // Optionally update activeFrame based on new project
    // setActiveFrame({ name: `Project${newProject}` });
    // setActiveButton({ name: `Project${newProject}` });
  }, [activeFrame, position, project, setProject, setActiveFrame]);

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
