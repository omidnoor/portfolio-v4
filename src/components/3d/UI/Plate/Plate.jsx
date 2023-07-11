import { useStore } from "@/stores/store";
import { MeshReflectorMaterial } from "@react-three/drei";
import { memo, useEffect, useState } from "react";
import PlateContent from "./PlateContent";

const Plate = ({ matcapTexture }) => {
  const [isAboutMe, setIsAboutMe] = useState(false);
  const [plateWidth, setPlateWidth] = useState([9.5, 12.5]);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  useEffect(() => {
    if (activeMenuButton === "About Me") {
      setIsAboutMe(true);
      setPlateWidth([20, 25]);
    } else {
      setIsAboutMe(false);
      setPlateWidth([9.5, 12.5]);
    }
  }, [activeMenuButton]);

  return (
    <group>
      <mesh position={[isAboutMe ? 21 : 15, 0, 0.15]}>
        <planeGeometry
          args={[
            plateWidth[0] - (isAboutMe ? 2 : 1),
            plateWidth[1] - (isAboutMe ? 2 : 1),
          ]}
        />
        <meshStandardMaterial
          color="#fcfcdc"
          roughness={0.8}
          metalness={0.05}
        />
        <PlateContent isAboutMe={isAboutMe} />
      </mesh>
      <mesh position={[isAboutMe ? 21 : 15, 0, 0.1]}>
        <planeGeometry args={plateWidth} />
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh>
    </group>
  );
};
export default memo(Plate);
