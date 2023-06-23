import { RoundedBox } from "@react-three/drei";
import ButtonIcon from "./ButtonIcon";
import { Vector3 } from "three";

const ButtonIcons = ({ btnMatcap, position }) => {
  return (
    <group position={position}>
      <ButtonIcon
        position={[1.5, 0, 0.1]}
        id="contactme"
        targetPosition={new Vector3(0, 2.5, -30)}
      />
      <ButtonIcon
        position={[1.1, 0, 0.1]}
        id="aboutme"
        targetPosition={new Vector3(5, 2.5, 0)}
      />
      <ButtonIcon
        position={[0.7, 0, 0.1]}
        id="testimonial"
        targetPosition={new Vector3(-5, 2.5, -5)}
      />
      <ButtonIcon
        position={[0.3, 0, 0.1]}
        id="projects"
        targetPosition={new Vector3(-8, 2.5, 10)}
      />
    </group>
  );
};
export default ButtonIcons;
