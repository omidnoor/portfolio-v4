import { useThree } from "@react-three/fiber";
import { memo, useCallback, useEffect, useRef } from "react";

import MenuPlate from "./MenuPlate";
import { useStore } from "@/stores/store";

const Menu = () => {
  const { camera } = useThree();
  const meshRef = useRef();

  const setIsMenuClicked = useStore((state) => state.setIsMenuClicked);

  useEffect(() => {
    camera.add(meshRef.current);
    return () => {
      camera.remove(meshRef.current);
    };
  }, [camera]);

  const handleClick = useCallback(() => {
    setIsMenuClicked(true);
  }, []);
  const handleMissed = useCallback(() => {
    setIsMenuClicked(false);
  }, []);

  return (
    <group>
      <mesh
        scale={0.4}
        onClick={handleClick}
        onPointerMissed={handleMissed}
        ref={meshRef}
        position={[0, -0.8, -2]}
        rotation={[-Math.PI / 4, 0, 0]}
      >
        <MenuPlate />
      </mesh>
    </group>
  );
};
export default memo(Menu);
