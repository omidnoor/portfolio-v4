import { useGLTF } from "@react-three/drei";

const Floor = () => {
  const model = useGLTF("./models/floor.glb");

  return <primitive object={model?.scene} />;
};
export default Floor;

useGLTF.preload("./models/floor.glb");
