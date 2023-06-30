export const setCameraLookAt = (
  cameraControlsRef,
  position = [0, 2.5, -3],
  rotation = [0, 0, 0],
) => {
  const lookAtX =
    position[0] +
    (rotation[1] !== 0 ? (3.3 * rotation[1]) / Math.abs(rotation[1]) : 0);
  const lookAtY = position[1] - 1;
  const lookAtZ = position[2] + (rotation[1] === 0 ? 3.3 : 0);
  const toX = position[0];
  const toY = position[1] - 1;
  const toZ = position[2];

  cameraControlsRef.current?.setLookAt(
    lookAtX,
    lookAtY,
    lookAtZ,
    toX,
    toY,
    toZ,
    true,
  );
};
