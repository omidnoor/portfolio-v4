import { useGLTF } from "@react-three/drei";
import { useStore } from "@/stores/store";
import { worldScale } from "@/stores/variables";

useGLTF.preload("./models/SceneModel.glb");

const SceneModel = () => {
  const model = useGLTF("./models/SceneModel.glb");

  const setIsSceneClicked = useStore((state) => state.setIsSceneClicked);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const setImageClicked = useStore((state) => state.setImageClicked);
  const setNoteClicked = useStore((state) => state.setNoteClicked);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsSceneClicked(!isSceneClicked);
    setActiveMenuButton("");
    setImageClicked(false);
    setNoteClicked(false);
  };

  return (
    <mesh scale={worldScale} onClick={handleClick}>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default SceneModel;
