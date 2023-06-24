import { useFrame, useThree } from "@react-three/fiber";
import { damp3, dampQ } from "maath/easing";
import { useCallback, useEffect, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";

const eps = 1e-1;

const useCamera = () => {
  const targetRef = useRef(null);

  if (!targetRef.current) {
    targetRef.current = new Vector3();
  }

  useFrame((state, delta) => {
    if (targetRef.current) {
      const distance = state.camera.position.distanceTo(targetRef.current);

      damp3(state.camera.position, targetRef.current, 0.8, delta);
    }
  });

  const moveCamera = useCallback((deltaPosition) => {
    const vector = new Vector3(
      deltaPosition.x,
      deltaPosition.y,
      deltaPosition.z,
    );
    targetRef.current.add(vector);
  }, []);

  const setCameraPosition = useCallback((newPosition) => {
    if (newPosition) {
      // const vector = new Vector3(newPosition.x, newPosition.y, newPosition.z);
      targetRef.current.set(newPosition.x, newPosition.y, newPosition.z);
    }
  }, []);

  return [moveCamera, setCameraPosition];
};
export default useCamera;
