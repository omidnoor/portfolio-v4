import { useGLTF } from "@react-three/drei";

const AbstractSphere = () => {
  const { nodes } = useGLTF(
    "./models/abstract-sphere-node-based-organic-animation.glb",
  );
  return (
    <mesh
    //   geometry={nodes.}
    ></mesh>
  );
};
export default AbstractSphere;
