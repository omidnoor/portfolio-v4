import { useMatcapTexture } from "@react-three/drei";
import {  useRef } from "react";
import { memo } from "react";
import FrameContent from "./FrameContent";
import FrameTitle from "./FrameTitle";
import TitlePlate from "./TitlePlate";


const ImageFrame = ({...props}) => {
  const frameRef = useRef(null);
  const [matcapTexture2] = useMatcapTexture("221917_928380_5F504D_7C746C", 256);
  return (
    <group>
      <mesh  position={[0, 0, 0]} {...props}>
        <boxGeometry   args={[2,2.5,0.05]} />
        <meshMatcapMaterial matcap={matcapTexture2} />
        <mesh
          ref={frameRef}
          position={[0, 0, 0.05]}
        >
          <planeGeometry args={[1.7,2.2]}/>
          <meshStandardMaterial  />

          <FrameContent frameRef={frameRef} props={...props}/>
          {/* <FrameTitle props={...props}/>
          <TitlePlate props={...props}  /> */}
        </mesh>
      </mesh>
      { <mesh  position={[0, 0, 0]} {...props}>
        <boxGeometry args={[2,2.5,0.05]} />
        <meshMatcapMaterial matcap={matcapTexture2} />
        <mesh
          ref={frameRef}
          position={[0, 0, 0.05]}
        >
          <planeGeometry args={[1.7,2.2]}/>
          <meshStandardMaterial/>

          <FrameContent frameRef={frameRef} props={...props}/>
          {/* <FrameTitle props={...props}/>
          <TitlePlate props={...props}  /> */}
        </mesh>
      </mesh>}
     
    </group>
  );
};
export default memo(ImageFrame);
