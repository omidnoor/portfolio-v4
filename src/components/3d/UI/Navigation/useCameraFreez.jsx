import { useStore } from "@/stores/store";
import { useState } from "react";
import { useEffect } from "react";

const useCameraFreez = (cameraControlsRef) => {
  const frameHovered = useStore((state) => state.frameHovered);
  const isLetsTalk = useStore((state) => state.isLetsTalk);
  const [cameraSleeped, setCameraSleeped] = useState(false);
  //   console.log(isLetsTalk, cameraSleeped, frameHovered);
  useEffect(() => {
    if (cameraControlsRef.current) {
      if (frameHovered && cameraSleeped) {
        cameraControlsRef.current.enabled = false;
        if (isLetsTalk) {
          cameraControlsRef.current.enabled = true;
        }
      } else {
        cameraControlsRef.current.enabled = true;
      }
    }
  }, [isLetsTalk, frameHovered, cameraSleeped]);

  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.addEventListener("sleep", () => {
        setCameraSleeped(true);
      });
      cameraControlsRef.current.addEventListener("wake", () => {
        setCameraSleeped(false);
      });
      cameraControlsRef.current.update();
      return () => {
        cameraControlsRef.current?.removeEventListener("sleep", () => {});
        cameraControlsRef.current?.removeEventListener("wake", () => {});
      };
    }
  }, []);
  return null;
};
export default useCameraFreez;
