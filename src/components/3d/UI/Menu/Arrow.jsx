import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import { useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import useCamera from "../../Utils/useCamera";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";

const Arrow = ({ position, rotation }) => {
  const meshRef = useRef();
  const [isHovered, setHovered] = useState(false);
  const { camera } = useThree();
  const { scale, handleMouseEnter, handleMouseLeave } = useHoverAnimation();

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  const [moveCamera, setCameraPosition] = useCamera();

  const handleClick = (e) => {
    const moveAmount = 5;
    const forward = new Vector3(0, 0, -moveAmount);
    // camera.localToWorld(forward);
    // camera.updateWorldMatrix(true, true);
    moveCamera(forward);
  };

  return (
    <a.mesh
      ref={meshRef}
      scale={scale}
      position={position}
      rotation={rotation}
      onPointerEnter={() => {
        handleMouseEnter();
        setHovered(true);
      }}
      onPointerLeave={() => {
        handleMouseLeave();
        setHovered(false);
      }}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <circleGeometry args={[0.15, 0, 0, Math.PI * 2]} />
    </a.mesh>
  );
};
export default Arrow;
