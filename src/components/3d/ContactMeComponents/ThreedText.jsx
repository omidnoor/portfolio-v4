import {
  Center,
  Float,
  PresentationControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { SRGBColorSpace } from "three";

const ThreedText = () => {
  const [matcapTexture] = useMatcapTexture("50332C_D98D79_955F52_AA7C6C", 256);
  matcapTexture.colorSpace = SRGBColorSpace;
  return (
    // <PresentationControls
    //   touchAction={false}
    //   global={true}
    //   cursor={true}
    //   snap={true}
    //   speed={1}
    //   zoom={1}
    //   rotation={[0, 0, 0]}
    //   config={{ mass: 1, tension: 170, friction: 10 }}
    // >
    <Float
      speed={1}
      rotationIntensity={0.2}
      floatIntensity={0.2}
      floatingRange={[0.1, 0.15]}
    >
      <Center position={[0, 18, 0]} rotation={[Math.PI / 8, 0, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          font="/inter_Bold.json"
        >
          LET'S TALK
          {/* <meshNormalMaterial /> */}
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
    </Float>
    // </PresentationControls>
  );
};
export default ThreedText;
