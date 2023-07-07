import {
  Center,
  Float,
  MeshDistortMaterial,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Effect from "../effect/Effect";
import { Sand_Color } from "../utilComponents/variables/colors";
import { useEffect } from "react";
import * as THREE from "three";

const Welcome = ({ position, margin = 0.5 }) => {
  const { width, height } = useThree((state) => state.viewport);

  // const [matcapTexture1] = useMatcapTexture("595356_CDBFC6_AA9DA3_BBB3BC", 256);
  // const [matcapTexture2] = useMatcapTexture("595356_CDBFC6_AA9DA3_BBB3BC", 256);

  return (
    <group>
      <Center position={[0, 3, 0]}>
        <Text3D
          font="/inter_Bold.json"
          letterSpacing={0.01}
          size={0.3}
          height={0.04}
        >
          Hi, Welcome to my gallery
          <meshStandardMaterial color={Sand_Color} />
        </Text3D>
      </Center>
      <Center position={[0, 2, 0]}>
        <Text3D
          font="/inter_Bold.json"
          letterSpacing={0.01}
          size={0.3}
          height={0.04}
        >
          My name is Omid
          {/* <meshMatcapMaterial matcap={matcapTexture2} toneMapped={false} /> */}
          <meshStandardMaterial color={Sand_Color} />
        </Text3D>
      </Center>
      <Center position={[0, 1, 0]}>
        <Text3D
          font="/inter_Bold.json"
          letterSpacing={0.01}
          size={0.3}
          height={0.04}
        >
          Creative Web Developer & Designer
          <meshStandardMaterial color={Sand_Color} />
        </Text3D>
      </Center>
      {/* <Effect /> */}
    </group>
  );
};
export default Welcome;
