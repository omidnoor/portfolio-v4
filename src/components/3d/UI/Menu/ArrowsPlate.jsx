const ArrowsPlate = () => {
  return (
    <mesh position={[-1, 0, 0.05]}>
      <circleGeometry args={[0.5]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};
export default ArrowsPlate;
