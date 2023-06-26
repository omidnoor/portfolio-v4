import { Center, useGLTF } from "@react-three/drei";

const ContactMeModel = ({ btnMatcap }) => {
  const { nodes } = useGLTF("./models/contactme.glb");
  // console.log(nodes);
  return (
    <mesh
      geometry={nodes.uploads_files_2310869_UI_Icons170.geometry}
      position={[-0.25, 0, 0]}
      rotation={[0, 0, 0]}
      //   scale={0.2}
    >
      <meshMatcapMaterial matcap={btnMatcap} />
    </mesh>
  );
};
export default ContactMeModel;
