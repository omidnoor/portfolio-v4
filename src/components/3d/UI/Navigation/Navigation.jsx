import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import { pages } from "@/stores/data";
import CameraInit from "./CameraInit";
import { setCameraLookAt } from "@/components/3d/UI/Navigation/setCameraLookAt";

const Navigation = () => {
  const cameraControlsRef = useRef(null);

  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const geoNormalArray = useStore((state) => state.geoNormalArray);

  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    const normal = geoNormalArray.find((geo) => geo.name === active?.name);
    const offset = 0.85;
    const dist = 5;

    const activePosition = active?.position;
    setCameraLookAt(
      cameraControlsRef,
      activePosition,
      normal?.normal,
      offset,
      dist,
    );

    if (!activeMenuButton) setActiveMenuButton("");
  }, [activeMenuButton]);

  return (
    <>
      <CameraInit cameraControlsRef={cameraControlsRef} />
      <CameraControls ref={cameraControlsRef} enabled={true} />
    </>
  );
};
export default memo(Navigation);
