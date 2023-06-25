import { Canvas } from "@react-three/fiber";
import { memo } from "react";

const Layout = ({ children }) => {
  return (
    <Canvas dpr={[1, 1.5]}>
      <ambientLight intensity={1} />
      <pointLight position={[1, 2, -2]} intensity={0.2} />
      {children}
    </Canvas>
  );
};
export default Layout;
