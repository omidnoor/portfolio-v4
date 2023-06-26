import { Center, useGLTF } from "@react-three/drei";

const HomeModel = ({ btnMatcap }) => {
  const { nodes } = useGLTF("./models/home.glb");
  console.log(nodes);
  return (
    <mesh
      geometry={nodes.uploads_files_2310869_UI_Icons132.geometry}
      position={[3, 0, 0]}
      rotation={[0, 0, 0]}
      //   scale={0.2}
    >
      <meshMatcapMaterial matcap={btnMatcap} />
    </mesh>
  );
};
export default HomeModel;
