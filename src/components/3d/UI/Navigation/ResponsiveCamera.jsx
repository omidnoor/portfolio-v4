import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      // renderer.setSize(window.innerWidth, window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return null;
};
export default ResponsiveCamera;
