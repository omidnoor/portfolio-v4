import { useFBX, useGLTF } from "@react-three/drei";
import { useStore } from "@/stores/store";
import { worldScale } from "@/stores/variables";
import { Suspense } from "react";

useGLTF.preload("./models/SceneModel.glb");

const SceneModel = () => {
  const model = useGLTF("./models/SceneModel.glb");
  // const model = useFBX("./models/SceneModel.fbx");

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
  console.log(model.nodes.ceiling);
  return (
    <mesh scale={worldScale} onClick={handleClick}>
      <Suspense fallback={null}>
        <primitive object={model.nodes.ceiling} />
        <primitive object={model.nodes.post} />
      </Suspense>
      <primitive object={model.nodes.floor} />
      <primitive object={model.nodes.walls} />
    </mesh>
  );
};
export default SceneModel;
