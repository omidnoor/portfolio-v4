import { useGLTF } from "@react-three/drei";
import { memo } from "react";

const AboutMeModel = ({ btnMatcap }) => {
  const { nodes } = useGLTF("./models/aboutme.glb");
  return (
    <mesh
      geometry={nodes.uploads_files_2310869_UI_Icons169.geometry}
      position={[1.5, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <meshMatcapMaterial matcap={btnMatcap} />
    </mesh>
  );
};
export default memo(AboutMeModel);

useGLTF.preload("./models/aboutme.glb");
