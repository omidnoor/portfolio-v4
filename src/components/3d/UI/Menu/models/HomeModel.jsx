import { useStore } from "@/stores/store";
import { useGLTF } from "@react-three/drei";
import { useCallback } from "react";
import { memo } from "react";

const HomeModel = ({ btnMatcap }) => {
  const { nodes } = useGLTF("./models/home.glb");

  return (
    <mesh
      geometry={nodes.uploads_files_2310869_UI_Icons132.geometry}
      position={[3, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <meshMatcapMaterial matcap={btnMatcap} />
    </mesh>
  );
};
export default memo(HomeModel);

useGLTF.preload("./models/home.glb");
