import { useStore } from "@/stores/store";
import { useEffect } from "react";

const CameraInit = ({ cameraControlsRef }) => {
  const isSceneClicked = useStore((state) => state.isSceneClicked);

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(0, 2.5, -3, 0, 2.5, -3, true);
  }, []);

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(0, 2.5, -2, 0, 2.5, -3, true);
  }, [isSceneClicked]);
  return null;
};
export default CameraInit;
