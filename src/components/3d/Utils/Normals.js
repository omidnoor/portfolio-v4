import { Matrix3, Vector3 } from "three";

export const normals = (frameRef) => {
  const normalMatrix = new Matrix3();
  const worldNormal = new Vector3();
  normalMatrix.getNormalMatrix(frameRef.matrixWorld);
  worldNormal.copy(new Vector3(0, 0, 1)).applyMatrix3(normalMatrix);
  return worldNormal;
};
