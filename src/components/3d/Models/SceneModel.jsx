import { useGLTF } from "@react-three/drei";
import { useStore } from "@/stores/store";

useGLTF.preload("./models/SceneModel.glb");

const SceneModel = () => {
  const model = useGLTF("./models/SceneModel.glb");

  const setIsSceneClicked = useStore((state) => state.setIsSceneClicked);
  const isSceneClicked = useStore((state) => state.isSceneClicked);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsSceneClicked(!isSceneClicked);
  };

  return (
    <mesh onPointerDown={handleClick}>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default SceneModel;
