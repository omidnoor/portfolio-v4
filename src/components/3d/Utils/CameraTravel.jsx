import { useStore } from "@/stores/store";
import { MeshReflectorMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { damp3, dampQ } from "maath/easing";
import { memo, useEffect, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import useCamera from "./useCamera";

let targetactiveButton = new Vector3();
let targetQuaternion = new Quaternion();

const CameraTravel = ({ position, rotation, args, id }) => {
  const activeButton = useStore((state) => state.activeButton);
  const setActiveButton = useStore((state) => state.setActiveButton);
  useEffect(() => {
    // setactiveButton(id, targetPosition);
    // console.log(activeButton.coordination);
  }, [activeButton]);
  useEffect(() => {
    // meshRef.current.updateWorldMatrix(true, true);
    // meshRef.current.localToWorld(targetPosition.set(0, 0, 2));
    // meshRef.current.getWorldQuaternion(targetQuaternion);
  }, [activeButton]);

  const [moveCamera, setCameraPosition, setCameraQuaternion] = useCamera();

  useEffect(() => {
    if (activeButton.coordination) {
      setCameraPosition(activeButton.coordination);
      setCameraQuaternion(activeButton.coordination);
    }
  }, [activeButton]);

  return null;
};

export default memo(CameraTravel);
