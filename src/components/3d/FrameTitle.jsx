import { Center, Text, Text3D } from "@react-three/drei";
import { Sand_Color } from "../utilComponents/variables/colors";

const FrameTitle = ({ props }) => {
  return (
    <mesh>
      <Center position={[0.5, -0.95, 0.02]}>
        <Text font="/inter_Bold.json" letterSpacing={-0.0} fontSize={0.1}>
          {props.name}
          <meshBasicMaterial toneMapped={false} color={Sand_Color} />
        </Text>
      </Center>
    </mesh>
  );
};
export default FrameTitle;
