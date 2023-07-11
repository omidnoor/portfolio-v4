import {
  Center,
  Float,
  MeshDistortMaterial,
  Text,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Effect from "../effect/Effect";
import { Sand_Color } from "../utilComponents/variables/colors";
import { memo, useEffect, useState } from "react";

const Welcome = ({ position, margin = 0.5 }) => {
  // const [matcapTexture1] = useMatcapTexture("595356_CDBFC6_AA9DA3_BBB3BC", 256);
  // const [matcapTexture2] = useMatcapTexture("595356_CDBFC6_AA9DA3_BBB3BC", 256);
  const [width, setWidth] = useState(window.innerWidth);
  const [fontSize, setFontSize] = useState(0.3);

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  useEffect(() => {
    setFontSize(Math.max(0.2, Math.min(0.5, width / 2466)));
  }, [width]);

  return (
    <group>
      <Text
        font="/Inter-Bold.woff"
        letterSpacing={0.01}
        fontSize={fontSize}
        position={[0, 3, -0.5]}
      >
        Welcome to my gallery
        <meshStandardMaterial color={Sand_Color} />
      </Text>

      <Text
        font="/Inter-Bold.woff"
        letterSpacing={0.01}
        fontSize={fontSize}
        position={[0, 2, -0.5]}
      >
        My name is Omid
        {/* <meshMatcapMaterial matcap={matcapTexture2} toneMapped={false} /> */}
        <meshStandardMaterial color={Sand_Color} />
      </Text>

      <Text
        font="/Inter-Bold.woff"
        letterSpacing={0.01}
        fontSize={fontSize}
        position={[0, 1, -0.5]}
      >
        Creative Web Developer & Designer
        <meshStandardMaterial color={Sand_Color} />
      </Text>
    </group>
  );
};
export default memo(Welcome);
