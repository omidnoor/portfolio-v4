import { useGLTF } from "@react-three/drei";
import { memo } from "react";

const ContactMeModel = ({ btnMatcap }) => {
  const { nodes } = useGLTF("./models/contactme.glb");
  return (
    <mesh
      geometry={nodes.uploads_files_2310869_UI_Icons170.geometry}
      position={[-0.25, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <meshMatcapMaterial matcap={btnMatcap} />
    </mesh>
  );
};
export default memo(ContactMeModel);

useGLTF.preload("./models/contactme.glb");
