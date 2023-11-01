import { useMatcapTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { memo } from "react";
import FrameContent from "./FrameContent";

import { worldScale } from "@/stores/variables";
import { useStore } from "@/stores/store";
import { useWindowWidth } from "./Utils/useWindowWidth";

const ImageFrame = ({ matcapTexture, ...props }) => {
  const [planeWidth, setPlaneWidth] = useState(11);

  const setFrameRef = useStore((state) => state.setFrameRef);
  const setPlateRef = useStore((state) => state.setPlateRef);

  const width = useWindowWidth();

  useEffect(() => {
    setPlaneWidth(Math.max(9, Math.min(12, width / 62)));
  }, [width]);

  useEffect(() => {
    setFrameRef(frameRef?.current);
    setPlateRef(plateRef?.current);
  }, []);

  const frameRef = useRef(null);
  const plateRef = useRef(null);
  console.log(props.name);
  return (
    <mesh ref={frameRef} {...props}>
      {props.name.includes("Project") ? (
        <planeGeometry
          args={[
            width < 500 ? 2.5 * worldScale : 5 * worldScale,
            3.5 * worldScale,
          ]}
        />
      ) : (
        <planeGeometry args={[5 * worldScale, 3.5 * worldScale]} />
      )}
      <meshMatcapMaterial matcap={matcapTexture} />
      <FrameContent frameRef={frameRef} props={props} />
    </mesh>
  );
};
export default memo(ImageFrame);
