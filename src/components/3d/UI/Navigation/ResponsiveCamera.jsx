import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const minWidth = 400;
const maxWidth = 1920;

const minFov = 60;
const maxFov = 200;

const ResponsiveCamera = ({ cameraControlsRef }) => {
  const { camera, size } = useThree();
  // console.log(
  //   Math.max(
  //     minFov,
  //     Math.min(
  //       maxFov,
  //       ((-size.width + maxWidth) / (maxWidth - minWidth)) * (maxFov - minFov) +
  //         minFov,
  //     ),
  //   ),
  // );
  // useEffect(() => {
  //   const newFov =
  //     ((-size.width + minWidth) / (maxWidth - minWidth)) * (maxFov - minFov) +
  //     minFov;
  //   camera.fov = Math.max(minFov, Math.min(maxFov, newFov));
  //   camera.aspect = size.width / size.height;
  //   camera.updateProjectionMatrix();
  // }, [size, camera]);

  // useEffect(() => {
  //   // cameraControlsRef.current?.forward(-5, true);
  //   // cameraControlsRef.current?.zoom(0.5, true);
  // }, [size]);

  return null;
};
export default ResponsiveCamera;
