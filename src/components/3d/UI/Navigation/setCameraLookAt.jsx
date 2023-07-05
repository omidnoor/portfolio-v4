import { Vector3 } from "three";

export const setCameraLookAt = (
  cameraControlsRef,
  position = [0, 25, -50],
  normal = new Vector3(0, 0, 1),
  offset = 1,
  dist = 5,
) => {
  const toX = position[0];
  const toY = position[1];
  const toZ = position[2];

  const lookAt = new Vector3(...position);
  const scaledNormal = normal?.clone().multiplyScalar(dist);
  lookAt?.add(scaledNormal);

  cameraControlsRef.current?.setLookAt(
    lookAt.x,
    lookAt.y - offset,
    lookAt.z,
    toX,
    toY - offset,
    toZ,
    true,
  );
};
