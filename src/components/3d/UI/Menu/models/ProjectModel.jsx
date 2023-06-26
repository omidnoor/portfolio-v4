import { Center, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Vector3 } from "three";

const ProjectModel = ({ btnMatcap }) => {
  const { nodes } = useGLTF("./models/projects.glb");
  useEffect(() => {
    nodes.uploads_files_2310869_UI_Icons285.position.set(0, 0, 0);
  }, []);
  console.log(nodes);
  console.log("project");
  return (
    <mesh
      scale={1}
      geometry={nodes.uploads_files_2310869_UI_Icons285.geometry}
      position={[-2, 0, 0]}
      rotation={[0, 0, 0]}
      //   scale={0.2}
    >
      <meshMatcapMaterial matcap={btnMatcap} />
    </mesh>
  );
};
export default ProjectModel;
