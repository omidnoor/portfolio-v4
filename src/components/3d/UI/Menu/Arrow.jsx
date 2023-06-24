import useHoverAnimation from "@/components/pageComponents/Projects/ProjectButtons/useHoverAnimation";
import { useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import useCamera from "../../Utils/useCamera";
import { Vector3 } from "three";

const Arrow = ({ position, rotation }) => {
  const meshRef = useRef();
  const [isHovered, setHovered] = useState(false);

  const { scale, handleMouseEnter, handleMouseLeave } = useHoverAnimation();

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  const [moveCamera, setCameraPosition, setCameraQuaternion] = useCamera();

  // const handleClick = () => {
  //   const moveAmount = 50;
  //   const forward = new Vector3(0, 0, -moveAmount);
  //   const camera = meshRef.current.parent.parent.parent.parent;
  //   camera.localToWorld(forward);
  //   camera.worldToLocal(forward);
  //   const newTarget = camera.position.clone().add(forward);
  //   moveCamera(newTarget);
  //   console.log(newTarget);
  // };

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
      onClick={() => {
        handleClick();
      }}
    >
      <circleGeometry args={[0.15, 0, 0, Math.PI * 2]} />
    </a.mesh>
  );
};
export default Arrow;
