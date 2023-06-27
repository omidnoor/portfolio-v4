import { useMatcapTexture } from "@react-three/drei";
import ButtonIcons from "./ButtonIcons";
import { memo, useRef } from "react";
import RightLeftArrow from "./models/RightLeftArrow";

const MenuPlate = () => {
  const meshRef = useRef();

  const [matcap, url] = useMatcapTexture("837667_DCD4C8_C5BAAC_3C2E22");

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 0.7]} />
      <meshMatcapMaterial matcap={matcap} castShadow receiveShadow />

      <ButtonIcons />
      <RightLeftArrow
        rotation={[0, 0, 0]}
        position={[2.7, 0, 0.1]}
        matcap={matcap}
      />
      <RightLeftArrow
        rotation={[0, 0, Math.PI]}
        position={[-2.7, 0, 0.1]}
        matcap={matcap}
      />
    </mesh>
  );
};
export default MenuPlate;
