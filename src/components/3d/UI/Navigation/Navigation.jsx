import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import { pages } from "@/stores/data";
import CameraInit from "./CameraInit";
import { setCameraLookAt } from "@/components/3d/UI/Navigation/setCameraLookAt";

const Navigation = () => {
  const cameraControlsRef = useRef(null);

  const activeMenuButton = useStore((state) => state.activeMenuButton);
  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    const activePosition = active?.position;
    const activeRotation = active?.rotation;

    setCameraLookAt(cameraControlsRef, activePosition, activeRotation);
  }, [activeMenuButton]);

  return (
    <>
      <CameraInit cameraControlsRef={cameraControlsRef} />
      <CameraControls ref={cameraControlsRef} enabled={true} />
    </>
  );
};
export default memo(Navigation);
