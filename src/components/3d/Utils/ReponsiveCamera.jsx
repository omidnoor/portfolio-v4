import { PerspectiveCamera } from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import { cameraInitCoor, camerainitLookAt } from "@/stores/variables";

const ResponsiveCamera = () => {
  const cameraRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current) {
        const aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.aspect = aspect;
        cameraRef.current.position.set(0, 2, -2);

        cameraRef.current.fov = 30;
        cameraRef.current.updateProjectionMatrix();
      }
    };
    // Initial update
    handleResize();
    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <PerspectiveCamera ref={cameraRef} makeDefault position={cameraInitCoor} />
  );
};

export default memo(ResponsiveCamera);
