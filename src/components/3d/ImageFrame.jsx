import {

  useMatcapTexture,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { memo } from "react";
import FrameContent from "./FrameContent";

import { worldScale } from "@/stores/variables";
import { useStore } from "@/stores/store";
import { useWindowWidth } from "./Utils/useWindowWidth";

const ImageFrame = ({ ...props }) => {
  const [planeWidth, setPlaneWidth] = useState(11);

  const setFrameRef = useStore((state) => state.setFrameRef);
  const setPlateRef = useStore((state) => state.setPlateRef);
  const activeMenuButton = useStore((state) => state.activeMenuButton);

const width = useWindowWidth()

  useEffect(() => {
    setPlaneWidth(Math.max(9, Math.min(12, width / 62)));
  }, [width]);

  useEffect(() => {
    setFrameRef(frameRef?.current);
    setPlateRef(plateRef?.current);
  }, []);

  const frameRef = useRef(null);
  const plateRef = useRef(null);
  const [matcapTexture] = useMatcapTexture("36220C_C6C391_8C844A_8B7B4C", 256);

  return (
      <mesh ref={frameRef} {...props}>
        <planeGeometry args={[2 * worldScale, 2.5 * worldScale]} />
        <meshMatcapMaterial matcap={matcapTexture} />
        <FrameContent frameRef={frameRef} props={...props} />
      </mesh>
  );
};
export default memo(ImageFrame);
