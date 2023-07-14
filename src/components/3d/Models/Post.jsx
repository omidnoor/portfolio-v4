import { useGLTF } from "@react-three/drei";

const Post = () => {
  const model = useGLTF("./models/post.glb");

  return <primitive object={model.scene} />;
};
export default Post;
