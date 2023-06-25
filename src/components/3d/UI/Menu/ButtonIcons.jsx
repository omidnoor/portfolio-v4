import { memo } from "react";
import ButtonIcon from "./ButtonIcon";
import { Vector3 } from "three";

const ButtonIcons = ({ btnMatcap, position }) => {
  return (
    <group position={position}>
      <ButtonIcon
        position={[1.9, 0, 0.1]}
        id="Home"
        targetPosition={new Vector3(0, 0, 0)}
      />
      <ButtonIcon
        position={[1.5, 0, 0.1]}
        id="Contact Me"
        targetPosition={new Vector3(0, 0, 0)}
      />
      <ButtonIcon
        position={[1.1, 0, 0.1]}
        id="About Me"
        targetPosition={new Vector3(0, 0, -10)}
      />
      <ButtonIcon
        position={[0.7, 0, 0.1]}
        id="Testimonials"
        targetPosition={new Vector3(20, 2.5, 10)}
      />
      <ButtonIcon
        position={[0.3, 0, 0.1]}
        id="Project1"
        targetPosition={new Vector3(-20, 2.5, 10)}
      />
    </group>
  );
};
export default memo(ButtonIcons);
