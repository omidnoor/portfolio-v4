import { useGLTF } from "@react-three/drei";

const Ceiling = () => {
  const model = useGLTF("./models/ceiling.glb");

  return <primitive object={model?.scene} />;
};
export default Ceiling;

useGLTF.preload("./models/ceiling.glb");
