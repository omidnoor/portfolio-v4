import { Center, useGLTF } from "@react-three/drei";

const AboutMeModel = ({ btnMatcap }) => {
  const { nodes } = useGLTF("./models/aboutme.glb");
  console.log(nodes);
  return (
    <mesh
      geometry={nodes.uploads_files_2310869_UI_Icons169.geometry}
      position={[1.5, 0, 0]}
      rotation={[0, 0, 0]}
      //   scale={0.2}
    >
      <meshMatcapMaterial matcap={btnMatcap} />
    </mesh>
  );
};
export default AboutMeModel;
