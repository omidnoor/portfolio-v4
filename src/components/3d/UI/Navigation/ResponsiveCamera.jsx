import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const minWidth = 400;
const maxWidth = 1920;

const minFov = 60;
const maxFov = 200;

const ResponsiveCamera = ({ cameraControlsRef }) => {
  const { camera, size } = useThree();

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      // renderer.setSize(window.innerWidth, window.innerHeight);
    };
    handleResize();
    // console.log(camera.aspect);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   cameraControlsRef.current?.forward(-5, true);
  //   cameraControlsRef.current?.zoom(0.5, true);
  // }, []);

  return null;
};
export default ResponsiveCamera;
