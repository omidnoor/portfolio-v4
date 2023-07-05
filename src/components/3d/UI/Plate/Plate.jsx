import { useGLTF } from "@react-three/drei";

const Plate = () => {
  const model = useGLTF("./models/gallery-plate-v1.glb");
  return <primitive object={model.scene} />;
};
export default Plate;
