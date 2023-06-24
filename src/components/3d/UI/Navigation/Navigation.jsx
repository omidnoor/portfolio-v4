import { CameraControls } from "@react-three/drei";
import { button, folder, useControls } from "leva";
import { useRef } from "react";

const Navigation = () => {
  const cameraControlsRef = useRef(null);
  const meshRef = useRef(null);
  const {
    minDistance,
    enabled,
    verticalDragToForward,
    dollyToCursor,
    infinityDolly,
  } = useControls({
    AboutMe: button(() => cameraControlsRef.current?.moveTo(-20, 2, -10, true)),

    Home: button(() => cameraControlsRef.current?.moveTo(20, 2, 0, true)),
    ContactMe: button(() => cameraControlsRef.current?.moveTo(0, 2, -10, true)),
    moveTo: folder(
      {
        vec1: { value: [10, 0, 2], label: "vec" },
        "moveTo(…vec)": button((get) =>
          cameraControlsRef.current?.moveTo(...get("moveTo.vec1"), true),
        ),
      },
      { collapsed: true },
    ),
    "fitToBox(mesh)": button(() =>
      cameraControlsRef.current?.fitToBox(meshRef.current, true),
    ),
    setPosition: folder(
      {
        vec2: { value: [-5, 2, 1], label: "vec" },
        "setPosition(…vec)": button((get) =>
          cameraControlsRef.current?.setPosition(
            ...get("setPosition.vec2"),
            true,
          ),
        ),
      },
      { collapsed: true },
    ),
    setTarget: folder(
      {
        vec3: { value: [3, 0, -3], label: "vec" },
        "setTarget(…vec)": button((get) =>
          cameraControlsRef.current?.setTarget(...get("setTarget.vec3"), true),
        ),
      },
      { collapsed: true },
    ),
    setLookAt: folder(
      {
        vec4: { value: [1, 2, 3], label: "position" },
        vec5: { value: [1, 1, 0], label: "target" },
        "setLookAt(…position, …target)": button((get) =>
          cameraControlsRef.current?.setLookAt(
            ...get("setLookAt.vec4"),
            ...get("setLookAt.vec5"),
            true,
          ),
        ),
      },
      { collapsed: true },
    ),
    lerpLookAt: folder(
      {
        vec6: { value: [-2, 0, 0], label: "posA" },
        vec7: { value: [1, 1, 0], label: "tgtA" },
        vec8: { value: [0, 2, 5], label: "posB" },
        vec9: { value: [-1, 0, 0], label: "tgtB" },
        t: { value: Math.random(), label: "t", min: 0, max: 1 },
        "f(…posA,…tgtA,…posB,…tgtB,t)": button((get) => {
          return cameraControlsRef.current?.lerpLookAt(
            ...get("lerpLookAt.vec6"),
            ...get("lerpLookAt.vec7"),
            ...get("lerpLookAt.vec8"),
            ...get("lerpLookAt.vec9"),
            get("lerpLookAt.t"),
            true,
          );
        }),
      },
      { collapsed: true },
    ),
    Target1: folder(
      {
        vec10: { value: [3.7, 1.8, -9], label: "position" },
        vec11: { value: [3.7, 1.8, -10], label: "target" },
        "setLookAt Target1": button((get) =>
          cameraControlsRef.current?.setLookAt(
            ...get("Target1.vec10"),
            ...get("Target1.vec11"),
            true,
          ),
        ),
      },
      { collapsed: true },
    ),
    saveState: button(() => cameraControlsRef.current?.saveState()),
    reset: button(() => cameraControlsRef.current?.reset(true)),
    minDistance: { value: 0 },
    enabled: { value: true, label: "controls on" },
    verticalDragToForward: {
      value: false,
      label: "vert. drag to move forward",
    },
    dollyToCursor: { value: false, label: "dolly to cursor" },
    infinityDolly: { value: false, label: "infinity dolly" },
  });
  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        minDistance={minDistance}
        enabled={enabled}
        verticalDragToForward={verticalDragToForward}
        dollyToCursor={dollyToCursor}
        infinityDolly={infinityDolly}
      />
      <mesh ref={meshRef} position={[-5, 1, -5]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};
export default Navigation;
