import { RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import useScaleOnResize from "../../Utils/UseScaleResize";
import { a, useSpring } from "@react-spring/three";
import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import usePushAnimation from "../../Utils/usePushAnimation";
import { useFrame } from "@react-three/fiber";

const ButtonIcon = ({ position }) => {
  // const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  const { scale, handleMouseEnter, handleMouseLeave, isHovered, setIsHovered } =
    useHoverAnimation();
  const { positionScaleZ, handlePointerDown, handlePointerUp } =
    usePushAnimation();
  // useScaleOnResize(meshRef, 0.3);

  useFrame(() => {
    if (isHovered && meshRef) {
      meshRef.current.position.z = positionScaleZ.get() * position[2];
      // console.log(position[2], positionScaleZ.get() * position[2]);
    }
  });
  return (
    <a.mesh
      position={[position[0], position[1], position[2]]}
      scale={scale}
      ref={meshRef}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <RoundedBox
        args={[0.3, 0.3, 0.1]}
        radius={0.01}
        smoothness={1}
        creaseAngle={0.1}
      >
        <meshStandardMaterial roughness={0} metalness={0.7} color={"#5cceee"} />
      </RoundedBox>
    </a.mesh>
  );
};
export default ButtonIcon;
