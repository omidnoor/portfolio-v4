import { RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import usePushAnimation from "../../Utils/usePushAnimation";
import { useFrame } from "@react-three/fiber";
import { useStore } from "@/stores/store";
import { Quaternion } from "three";
import { damp3, dampQ } from "maath/easing";

const ButtonIcon = ({
  id,
  position,
  targetPosition,
  targetQuaternion = new Quaternion(0, 0, 0, 1),
}) => {
  const meshRef = useRef();
  const [isClicked, setIsClicked] = useState(false);

  const activeButton = useStore((state) => state.activeButton);
  const setactiveButton = useStore((state) => state.setactiveButton);

  useEffect(() => {
    // setactiveButton(id, targetPosition);
    console.log(activeButton);
  }, [activeButton]);
  const { scale, handleMouseEnter, handleMouseLeave, isHovered } =
    useHoverAnimation();
  const { positionScaleZ, handlePointerDown, handlePointerUp } =
    usePushAnimation();

  useFrame((state, delta) => {
    if (isHovered && meshRef) {
      meshRef.current.position.z = positionScaleZ.get() * position[2];
    }
  });

  return (
    <a.mesh
      position={position}
      scale={scale}
      ref={meshRef}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={() => setactiveButton(id, targetPosition)}
      onPointerMissed={() => setIsClicked(false)}
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
