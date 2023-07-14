import { useGLTF } from "@react-three/drei";

const Walls = () => {
  const model = useGLTF("./models/walls.glb");

  return <primitive object={model.scene} />;
};
export default Walls;

useGLTF.preload("./models/walls.glb");
