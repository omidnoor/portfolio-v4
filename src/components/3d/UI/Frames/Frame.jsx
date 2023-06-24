const Frame = () => {
  return (
    <group>
      <mesh position={[3.6, 2.5, -12.33]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 0.05]} />
        <meshStandardMaterial color="#ffffcf" />
      </mesh>
    </group>
  );
};
export default Frame;
