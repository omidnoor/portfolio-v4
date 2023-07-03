import { Vector3 } from "three";

export const setCameraLookAt = (
  cameraControlsRef,
  position = [0, 2.5, -5],
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

// const epsilon = 0.01;
//   const isRotationNearPiOver2 =
//     Math.abs(Math.abs(rotation[1]) - Math.PI / 2) < epsilon;
//   const normal = rotation[1] / Math.abs(rotation[1]);

//   const m = isRotationNearPiOver2 ? 0 : Math.tan(rotation[1]);
//   // console.log(m);
//   const lookAtZ = isRotationNearPiOver2
//     ? position[2]
//     : position[2] + (dist * normal) / Math.sqrt(1 + m * m);

//   const lookAtX = isRotationNearPiOver2
//     ? position[0] + normal * dist
//     : (1 + m) * position[0] + (m * dist) / Math.sqrt(1 + m * m);

//   // const lookAtX =
//   //   position[0] +
//   //   (rotation[1] !== 0 ? (dist * rotation[1]) / Math.abs(rotation[1]) : 0);
//   const lookAtY = position[1] - 1;
//   // console.log(lookAtX, lookAtY, lookAtZ);
//   // const lookAtZ = position[2] + (rotation[1] === 0 ? dist : 0);
//   const toX = position[0];
//   const toY = position[1] - 1;
//   const toZ = position[2];
