import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import { useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import { useHover } from "react-use-gesture";

const Arrow = ({ position, rotation }) => {
  const meshRef = useRef();
  const [isHovered, setHovered] = useState(false);

  const { scale, handleMouseEnter, handleMouseLeave } = useHoverAnimation();

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);
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
    >
      <circleGeometry args={[0.15, 0, 0, Math.PI * 2]} />
    </a.mesh>
  );
};
export default Arrow;
