import { memo } from "react";
import ButtonIcon from "./ButtonIcon";
import { Vector3 } from "three";

const ButtonIcons = () => {
  return (
    <group position={[0, 0, 0.04]} rotation={[Math.PI, 0, 0]} scale={0.6}>
      <ButtonIcon
        position={[0, 0, 0.1]}
        name="Home"
        targetPosition={new Vector3(0, 0, 0)}
      />
      <ButtonIcon
        position={[0, 0, 0.1]}
        name="Contact Me"
        targetPosition={new Vector3(0, 0, 0)}
      />
      <ButtonIcon
        position={[0, 0, 0.1]}
        name="About Me"
        targetPosition={new Vector3(0, 0, -10)}
      />
      <ButtonIcon
        position={[0, 0, 0.1]}
        name="Testimonials"
        targetPosition={new Vector3(20, 2.5, 10)}
      />
      <ButtonIcon
        position={[0, 0, 0.1]}
        name="Project1"
        targetPosition={new Vector3(-20, 2.5, 10)}
      />
    </group>
  );
};
export default memo(ButtonIcons);
