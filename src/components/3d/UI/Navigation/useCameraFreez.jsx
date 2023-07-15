import { useStore } from "@/stores/store";
import { useEffect } from "react";

const useCameraFreez = (cameraControlsRef) => {
  const frameHovered = useStore((state) => state.frameHovered);
  useEffect(() => {
    if (cameraControlsRef.current && frameHovered) {
      cameraControlsRef.current.enabled = false;
    } else {
      cameraControlsRef.current.enabled = true;
    }
  }, [cameraControlsRef, frameHovered]);
  return null;
};
export default useCameraFreez;
