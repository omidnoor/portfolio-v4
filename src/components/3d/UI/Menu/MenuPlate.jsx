import {
  MeshReflectorMaterial,
  RoundedBox,
  useMatcapTexture,
} from "@react-three/drei";
import ButtonIcons from "./ButtonIcons";
import { useEffect, useRef } from "react";
import useScaleOnResize from "../../Utils/UseScaleResize";

const MenuPlate = () => {
  const meshRef = useRef();

  const [matcap, url] = useMatcapTexture("6C6F76_CBD1D7_B2BDC7_A6B0BF");
  const [btnMatcap, btnUrl] = useMatcapTexture("BA8979_DDCBCA_9A4726_892407");

  useScaleOnResize(meshRef, 0.3);

  return (
    <RoundedBox
      ref={meshRef}
      args={[4, 0.7, 0.05]}
      radius={0.01}
      smoothness={1}
      creaseAngle={0.1}
    >
      <meshMatcapMaterial matcap={matcap} />
      <ButtonIcons position={[0, 0, 0.03]} btnMatcap={btnMatcap} />
    </RoundedBox>
  );
};
export default MenuPlate;
