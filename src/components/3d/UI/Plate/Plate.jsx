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
    <mesh position={[isAboutMe ? 21 : 15, 0, 0.1]}>
      <PlateContent isAboutMe={isAboutMe} />
      <planeGeometry args={plateWidth} />
      {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
    </mesh>
  );
};
export default memo(Plate);
