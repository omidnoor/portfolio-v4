import Arrow from "./Arrow";
import ArrowsPlate from "./ArrowsPlate";

const Arrows = () => {
  return (
    <group position={[0, 0, 0.1]}>
      {/* <ArrowsPlate /> */}
      <Arrow position={[-0.75, 0, 0]} rotation={[0, 0, 0]} />
      <Arrow position={[-1.25, 0, 0]} rotation={[0, 0, Math.PI]} />
      <Arrow position={[-1.0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]} />
      <Arrow position={[-1.0, -0.25, 0]} rotation={[0, 0, -Math.PI / 2]} />
    </group>
  );
};
export default Arrows;
