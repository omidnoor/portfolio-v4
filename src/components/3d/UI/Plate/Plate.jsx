import { useStore } from "@/stores/store";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useEffect } from "react";
import PlateContent from "./PlateContent";

const Plate = ({ matcapTexture }) => {
  return (
    <group>
      <mesh position={[15, 0, 0.15]}>
        <planeGeometry args={[8.5, 11.5]} />
        <meshStandardMaterial
          color="#fcfcdc"
          roughness={0.8}
          metalness={0.05}
        />
        <PlateContent />
      </mesh>
      <mesh position={[15, 0, 0.1]}>
        <planeGeometry args={[9.5, 12.5]} />
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh>
    </group>
  );
};
export default Plate;
