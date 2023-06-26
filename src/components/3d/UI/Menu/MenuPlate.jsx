import {
  Center,
  MeshReflectorMaterial,
  RoundedBox,
  useMatcapTexture,
} from "@react-three/drei";
import ButtonIcons from "./ButtonIcons";
import { memo, useRef } from "react";
import Arrows from "./Arrows";

const MenuPlate = () => {
  const meshRef = useRef();

  const [matcap, url] = useMatcapTexture("837667_DCD4C8_C5BAAC_3C2E22");

  return (
    <RoundedBox
      scale={1}
      ref={meshRef}
      args={[5, 0.7, 0.01]}
      radius={0.01}
      smoothness={1}
      creaseAngle={0.1}
    >
      <meshMatcapMaterial matcap={matcap} castShadow receiveShadow />
      {/* <MeshReflectorMaterial
        metalness={0}
        roughness={0.2}
        color={"#150215"}
        emissive={"#1ff"}
      /> */}
      <ButtonIcons position={[-0.3, -0.03, 0.03]} />
    </RoundedBox>
  );
};
export default MenuPlate;
