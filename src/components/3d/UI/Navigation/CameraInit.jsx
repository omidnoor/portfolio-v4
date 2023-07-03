import { useStore } from "@/stores/store";
import { useEffect } from "react";
import { cameraInitCoor, camerainitLookAt } from "@/stores/variables";

const CameraInit = ({ cameraControlsRef }) => {
  const isSceneClicked = useStore((state) => state.isSceneClicked);

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(
      ...cameraInitCoor,
      ...camerainitLookAt,
      true,
    );
  }, []);

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(
      ...cameraInitCoor,
      ...camerainitLookAt,
      true,
    );
  }, [isSceneClicked]);
  return null;
};
export default CameraInit;
