import { Vector3 } from "three";

export const setCameraLookAt = (
  cameraControlsRef,
  position = [0, 25, -50],
  normal = new Vector3(0, 0, 1),
  offset1 = 1,
  offset2 = 0,
  dist = 50,
) => {
  const toPos = new Vector3(...position);
  const lookAtPos = new Vector3(...position);
  const scaledNormal = normal?.clone().multiplyScalar(dist);

  lookAtPos?.add(scaledNormal);
  let cross = new Vector3(0, 1, 0);

  cross.crossVectors(normal.clone().multiplyScalar(-1), cross);
  const offsetVector = cross.clone().multiplyScalar(offset2);

  toPos.add(offsetVector);
  lookAtPos.add(offsetVector);

  // console.log(cross, normal);
  cameraControlsRef.current?.setLookAt(
    lookAtPos.x,
    lookAtPos.y - offset1,
    lookAtPos.z,
    toPos.x,
    toPos.y - offset1,
    toPos.z,
    true,
  );
};
