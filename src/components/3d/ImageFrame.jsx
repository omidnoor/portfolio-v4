import { Html, Text, useMatcapTexture } from "@react-three/drei";
import { useRef } from "react";
import { memo } from "react";
import FrameContent from "./FrameContent";

import Plate from "./UI/Plate/Plate";
import { worldScale } from "@/stores/variables";

const ImageFrame = ({ ...props }) => {
  const frameRef = useRef(null);
  const [matcapTexture2] = useMatcapTexture("221917_928380_5F504D_7C746C", 256);
  return (
    <mesh ref={frameRef} position={[0, 0, 0]} {...props}>
      <mesh  >
        <boxGeometry args={[2 * worldScale, 2.5 * worldScale, 2]} />
        <meshMatcapMaterial matcap={matcapTexture2} />
        <FrameContent frameRef={frameRef} props={...props} />
      </mesh>
      
    </mesh>
  );
};
export default memo(ImageFrame);
