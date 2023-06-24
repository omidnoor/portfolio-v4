import { useFrame, useThree } from "@react-three/fiber";
import { damp3, dampQ } from "maath/easing";
import { useCallback, useEffect, useState } from "react";
import { Quaternion, Vector3 } from "three";

const useCamera = () => {
  const [target, setTarget] = useState();
  const [quaternion, setQuaternion] = useState();
  const { camera } = useThree();

  useFrame((state, delta) => {
    // state.camera.position.copy(target);
    if (target) {
      damp3(state.camera.position, target, 0.8, delta);
      dampQ(state.camera.quaternion, quaternion, 1, delta);
    }
  });

  const moveCamera = (deltaPosition) => {
    setTarget((prevTarget) => prevTarget.clone().add(deltaPosition));
  };

  const setCameraPosition = (newPosition) => {
    if (newPosition) {
      const vector = new Vector3(newPosition.x, newPosition.y, newPosition.z);
      setTarget(vector.clone());
    }
  };

  const setCameraQuaternion = useCallback((newQuaternion) => {
    const vector = new Quaternion(newQuaternion);
    setQuaternion(vector.clone());
  });

  return [moveCamera, setCameraPosition, setCameraQuaternion];
};
export default useCamera;

// useEffect(() => {
//   camera.updateWorldMatrix(true, true);
//   camera.localToWorld(target);
//   camera.worldToLocal(target);
//   console.log(camera.position, target);
// });

// const distance = state.camera.position.distanceTo(target);

// console.log(state.camera.position.x, distance, target.x);
// const threshold = 0.01;
// if (threshold > distance) {
//   state.camera.position.copy(target);
// }
