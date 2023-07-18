import { useStore } from "@/stores/store";
import { MeshReflectorMaterial } from "@react-three/drei";
import { memo, useEffect, useState } from "react";
import PlateContent from "./PlateContent";

const Plate = ({ matcapTexture, plate }) => {
  return (
    <mesh position={[21, 0, 0.1]}>
      <PlateContent plate={plate} />
      <planeGeometry args={[20, 25]} />
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
};
export default memo(Plate);
