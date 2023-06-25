import { useMatcapTexture } from "@react-three/drei";
import { useEffect } from "react";
import { useState } from "react";

const TitlePlate = ({ props, setTitle }) => {
  const [matcapTexture2] = useMatcapTexture("221917_928380_5F504D_7C746C", 256);

  return (
    <mesh
      position={[0, -1.45, 0]}
      onClick={() => {
        setTitle(props.name);
      }}
    >
      <boxGeometry args={[0.7, 0.3, 0.02]} />
      <meshMatcapMaterial matcap={matcapTexture2} />
    </mesh>
  );
};
export default TitlePlate;
