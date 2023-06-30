import { useStore } from "@/stores/store";
import { useGLTF } from "@react-three/drei";
import { memo, useEffect } from "react";

const ProjectModel = ({ btnMatcap }) => {
  const { nodes } = useGLTF("./models/projects.glb");
  useEffect(() => {
    nodes.uploads_files_2310869_UI_Icons285.position.set(0, 0, 0);
  }, []);

  return (
    <mesh
      scale={1}
      geometry={nodes.uploads_files_2310869_UI_Icons285.geometry}
      position={[-2, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <meshMatcapMaterial matcap={btnMatcap} />
    </mesh>
  );
};
export default memo(ProjectModel);

useGLTF.preload("./models/projects.glb");
