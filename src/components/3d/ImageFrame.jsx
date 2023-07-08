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
  const [matcapTexture2] = useMatcapTexture("1B1B1B_515151_7E7E7E_6C6C6C", 256);
  return (
    <>
    
    {props.name !== "Home" && (<mesh  ref={frameRef} position={[0, 0, 0]} {...props}>
        <boxGeometry args={[2 * worldScale, 2.5 * worldScale, 2]} />
        <meshMatcapMaterial matcap={matcapTexture2} />
        <FrameContent frameRef={frameRef} props={...props} />
        <Plate />
    </mesh>)}
    {props.name === "Home" && (
        <mesh scale={worldScale} position={[0, 0, -105]}>
          <mesh position={[0,0,-1]}>
          <planeGeometry args={[11, 8]} />
          <meshMatcapMaterial matcap={matcapTexture2} />
          {/* <MeshReflectorMaterial roughness={0.8} color={"#000015"} metalness={1} /> */}
          </mesh>
          <Welcome/>
        </mesh>
      )}
    </>
  );
};
export default memo(ImageFrame);
