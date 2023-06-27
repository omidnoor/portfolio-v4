import { PerspectiveCamera } from "@react-three/drei";
import { memo, useEffect, useRef } from "react";

const ResponsiveCamera = () => {
  const cameraRef = useRef();

  useEffect(() => {
    // cameraRef.current?.updateProjectionMatrix();
    // cameraRef.current?.updateMatrixWorld();
    // cameraRef.current?.quaternion.set(0, 0, 0.7, 1);
    // console.log(cameraRef.current);
    // cameraRef.current?.lookAt(0, 2.5, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current) {
        const aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.aspect = aspect;

        cameraRef.current.fov = 55;
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
    <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.5, 2]} />
  );
};

export default memo(ResponsiveCamera);
