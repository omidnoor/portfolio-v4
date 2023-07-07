import { Html, MeshReflectorMaterial, Text, useGLTF, useMatcapTexture } from "@react-three/drei";
import { useRef } from "react";
import { memo } from "react";
import FrameContent from "./FrameContent";

import Plate from "./UI/Plate/Plate";
import { worldScale } from "@/stores/variables";
import Welcome from "./Welcome";
import { Dark_Purple, Sand_Color } from "../utilComponents/variables/colors";

const ImageFrame = ({ ...props }) => {
  
  const frameRef = useRef(null);
  const [matcapTexture2] = useMatcapTexture("2D2D2F_C6C2C5_727176_94949B", 256);
  return (
    <>
    
    {props.name !== "Home" && (<mesh  ref={frameRef} position={[0, 0, 0]} {...props}>
        <boxGeometry args={[2 * worldScale, 2.5 * worldScale, 2]} />
        <meshMatcapMaterial matcap={matcapTexture2} />
        <FrameContent frameRef={frameRef} props={...props} />
        <Plate />
    </mesh>)}
    {props.name === "Home" && (
        <mesh scale={worldScale} position={[0, 0, -50]}>
          <mesh position={[0,0,-1]}>
          <planeGeometry args={[11, 8]} />
          {/* <meshMatcapMaterial matcap={matcapTexture2} /> */}
          <MeshReflectorMaterial roughness={0.8} color={Dark_Purple} metalness={1} />
          </mesh>
          <Welcome/>
        </mesh>
      )}
    </>
  );
};
export default memo(ImageFrame);
