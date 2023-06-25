import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import MenuPlate from "./MenuPlate";
import { useStore } from "@/stores/store";

const Menu = ({ pages }) => {
  const { camera } = useThree();
  const meshRef = useRef();

  const setIsMenuClicked = useStore((state) => state.setIsMenuClicked);

  useEffect(() => {
    camera.add(meshRef.current);
    return () => {
      camera.remove(meshRef.current);
    };
  }, [camera]);

  const handleClick = () => {
    setIsMenuClicked(true);
  };

  return (
    <group>
      <mesh
        onClick={handleClick}
        onPointerMissed={() => setIsMenuClicked(false)}
        ref={meshRef}
        position={[0, -0.7, -1.7]}
        rotation={[-Math.PI / 4, 0, 0]}
      >
        <MenuPlate />
      </mesh>
    </group>
  );
};
export default Menu;
