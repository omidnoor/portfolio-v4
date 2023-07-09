import { Html, MeshReflectorMaterial, Text, useGLTF, useMatcapTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { memo } from "react";
import FrameContent from "./FrameContent";

import Plate from "./UI/Plate/Plate";
import { worldScale } from "@/stores/variables";
import Welcome from "./Welcome";
import { Dark_Purple, Sand_Color } from "../utilComponents/variables/colors";
import { useThree } from "@react-three/fiber";

const ImageFrame = ({ ...props }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [planeWidth, setPlaneWidth] = useState(11);

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    }
  }, []);

  useEffect(() => {
    setPlaneWidth(Math.max(9,Math.min(12,width/62)))
  }, [width]);

  const frameRef = useRef(null);
  const [matcapTexture] = useMatcapTexture("1B1B1B_515151_7E7E7E_6C6C6C", 256);
  return (
    <>
      {props.name !== "Home" && (<mesh  ref={frameRef} position={[0, 0, 0]} {...props}>
        <boxGeometry args={[2 * worldScale, 2.5 * worldScale, 2]} />
        <meshMatcapMaterial matcap={matcapTexture} />
        <FrameContent frameRef={frameRef} props={...props} />
        <Plate matcapTexture={matcapTexture} />
      </mesh>)}
      {props.name === "Home" && (
        <mesh scale={worldScale} position={[0, 0, -105]}>
          <mesh position={[0,2,-1]}>
            <planeGeometry args={[planeWidth, 4]} />
            <meshMatcapMaterial matcap={matcapTexture} />
          </mesh>
          <Welcome/>
        </mesh>
      )}
    </>
  );
};
export default memo(ImageFrame);
