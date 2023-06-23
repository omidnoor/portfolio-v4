import { RoundedBox } from "@react-three/drei";
import ButtonIcon from "./ButtonIcon";

const ButtonIcons = ({ btnMatcap, position }) => {
  return (
    <group position={position}>
      <ButtonIcon position={[1.5, 0, 0.1]} />
      <ButtonIcon position={[1.1, 0, 0.1]} />
      <ButtonIcon position={[0.7, 0, 0.1]} />
      <ButtonIcon position={[0.3, 0, 0.1]} />
    </group>
  );
};
export default ButtonIcons;
