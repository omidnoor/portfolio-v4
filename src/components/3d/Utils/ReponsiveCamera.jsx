import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";

const ResponsiveCamera = () => {
  const cameraRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current) {
        const aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.aspect = aspect;
        cameraRef.current.fov = 55;
        cameraRef.current.updateProjectionMatrix();
        // console.log(cameraRef.current);
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

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} />;
};

export default ResponsiveCamera;
