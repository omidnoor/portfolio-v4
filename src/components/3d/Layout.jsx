import { useStore } from "@/stores/store";
import { Canvas } from "@react-three/fiber";
import { memo } from "react";

const Layout = ({ children }) => {
  return (
    <Canvas dpr={[1, 1.5]}>
      <ambientLight intensity={10} />
      <pointLight intensity={10} position={[0, 1, 0]} />
      {children}
    </Canvas>
  );
};
export default memo(Layout);
