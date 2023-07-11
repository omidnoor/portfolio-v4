import { useMatcapTexture } from "@react-three/drei";
import { useEffect } from "react";
import { useState } from "react";

const TitlePlate = ({ props, setTitle }) => {
  const [matcapTexture2] = useMatcapTexture("36220C_C6C391_8C844A_8B7B4C", 256);

  return (
    <mesh position={[0, -1.45, 0]}>
      <boxGeometry args={[0.7, 0.3, 0.02]} />
      <meshMatcapMaterial matcap={matcapTexture2} />
    </mesh>
  );
};
export default TitlePlate;
