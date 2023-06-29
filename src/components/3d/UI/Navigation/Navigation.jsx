import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { act } from "@react-three/fiber";
import { button, folder, useControls } from "leva";
import { memo, useEffect, useRef } from "react";
import { pages } from "@/stores/data";
import PageProjects from "@/pages/PageProjects";

const Navigation = () => {
  const cameraControlsRef = useRef(null);
  const meshRef = useRef(null);
  // const {
  //   minDistance,
  //   enabled,
  //   verticalDragToForward,
  //   dollyToCursor,
  //   infinityDolly,
  // } = useControls({
  //   AboutMe: button(() => cameraControlsRef.current?.moveTo(-20, 2, -10, true)),

  //   Home: button(() => cameraControlsRef.current?.moveTo(20, 2, 0, true)),
  //   ContactMe: button(() => cameraControlsRef.current?.moveTo(0, 2, -10, true)),
  //   moveTo: folder(
  //     {
  //       vec1: { value: [10, 0, 2], label: "vec" },
  //       "moveTo(…vec)": button((get) =>
  //         cameraControlsRef.current?.moveTo(...get("moveTo.vec1"), true),
  //       ),
  //     },
  //     { collapsed: true },
  //   ),
  //   "fitToBox(mesh)": button(() =>
  //     cameraControlsRef.current?.fitToBox(meshRef.current, true),
  //   ),
  //   setPosition: folder(
  //     {
  //       vec2: { value: [-5, 2, 1], label: "vec" },
  //       "setPosition(…vec)": button((get) =>
  //         cameraControlsRef.current?.setPosition(
  //           ...get("setPosition.vec2"),
  //           true,
  //         ),
  //       ),
  //     },
  //     { collapsed: true },
  //   ),
  //   setTarget: folder(
  //     {
  //       vec3: { value: [3, 0, -3], label: "vec" },
  //       "setTarget(…vec)": button((get) =>
  //         cameraControlsRef.current?.setTarget(...get("setTarget.vec3"), true),
  //       ),
  //     },
  //     { collapsed: true },
  //   ),
  //   setLookAt: folder(
  //     {
  //       vec4: { value: [1, 2, 3], label: "position" },
  //       vec5: { value: [1, 1, 0], label: "target" },
  //       "setLookAt(…position, …target)": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           ...get("setLookAt.vec4"),
  //           ...get("setLookAt.vec5"),
  //           true,
  //         ),
  //       ),
  //     },
  //     { collapsed: true },
  //   ),
  //   lerpLookAt: folder(
  //     {
  //       vec6: { value: [-2, 0, 0], label: "posA" },
  //       vec7: { value: [1, 1, 0], label: "tgtA" },
  //       vec8: { value: [0, 2, 5], label: "posB" },
  //       vec9: { value: [-1, 0, 0], label: "tgtB" },
  //       t: { value: Math.random(), label: "t", min: 0, max: 1 },
  //       "f(…posA,…tgtA,…posB,…tgtB,t)": button((get) => {
  //         return cameraControlsRef.current?.lerpLookAt(
  //           ...get("lerpLookAt.vec6"),
  //           ...get("lerpLookAt.vec7"),
  //           ...get("lerpLookAt.vec8"),
  //           ...get("lerpLookAt.vec9"),
  //           get("lerpLookAt.t"),
  //           true,
  //         );
  //       }),
  //     },
  //     { collapsed: true },
  //   ),
  //   HomePage: folder(
  //     {
  //       "setLookAt HomePage": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           3.6,
  //           1.5,
  //           -9,
  //           3.6,
  //           1.5,
  //           -12.33,
  //           true,
  //         ),
  //       ),
  //     },
  //     { collapsed: true },
  //   ),
  //   TestemonialPage: folder(
  //     {
  //       "setLookAt TestemonialPage": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           9,
  //           1.5,
  //           -3.7,
  //           12.35,
  //           1.5,
  //           -3.7,
  //           true,
  //         ),
  //       ),
  //     },
  //     { collapsed: true },
  //   ),
  //   ContactPage: folder(
  //     {
  //       "setLookAt ContactPage": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           9,
  //           1.5,
  //           -8.6,
  //           12.37,
  //           1.5,
  //           -8.6,
  //           true,
  //         ),
  //       ),
  //     },
  //     { collapsed: true },
  //   ),
  //   ProjectsPage: folder(
  //     {
  //       "setLookAt Project1Page": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           -10,
  //           1.5,
  //           -22,
  //           -10,
  //           1.5,
  //           -25,
  //           true,
  //         ),
  //       ),
  //       "setLookAt Project2Page": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           -6,
  //           1.5,
  //           -22,
  //           -6,
  //           1.5,
  //           -25,
  //           true,
  //         ),
  //       ),
  //       "setLookAt Project3Page": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           -2,
  //           1.5,
  //           -22,
  //           -2,
  //           1.5,
  //           -25,
  //           true,
  //         ),
  //       ),
  //       "setLookAt Project4Page": button((get) =>
  //         cameraControlsRef.current?.setLookAt(2, 1.5, -22, 2, 1.5, -25, true),
  //       ),
  //       "setLookAt Project5Page": button((get) =>
  //         cameraControlsRef.current?.setLookAt(6, 1.5, -22, 6, 1.5, -25, true),
  //       ),
  //       "setLookAt Project6Page": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           10,
  //           1.5,
  //           -22,
  //           10,
  //           1.5,
  //           -25,
  //           true,
  //         ),
  //       ),
  //     },
  //     { collapsed: true },
  //   ),
  //   saveState: button(() => cameraControlsRef.current?.saveState()),
  //   reset: button(() => cameraControlsRef.current?.reset(true)),
  //   minDistance: { value: 0 },
  //   enabled: { value: true, label: "controls on" },
  //   verticalDragToForward: {
  //     value: true,
  //     label: "vert. drag to move forward",
  //   },
  //   dollyToCursor: { value: true, label: "dolly to cursor" },
  //   infinityDolly: { value: true, label: "infinity dolly" },
  // });

  const activeFrame = useStore((state) => state.activeFrame);
  const setActiveFrame = useStore((state) => state.setActiveFrame);

  const activeFrames = useStore((state) => state.activeFrames);
  const setActiveFrames = useStore((state) => state.setActiveFrames);
  const isMenuClicked = useStore((state) => state.isMenuClicked);

  const project = useStore((state) => state.project);

  const setCameraLookAt = (position, rotation) => {
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

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(0, 2.5, -3, 0, 2.5, -3, true);
  }, []);

  useEffect(() => {
    if (!activeFrame?.name && !isMenuClicked) {
      // setActiveButton({ name: "" });
      cameraControlsRef.current?.setLookAt(0, 2.5, -2, 0, 2.5, -3, true);
    }
  }, [activeFrame]);

  useEffect(() => {
    if (activeFrame.name) {
      const active = pages.filter((page) => page.name === activeFrame.name)[0];
      const activePosition = active?.position;
      const activeRotation = active?.rotation;
      if (activePosition) {
        setCameraLookAt(activePosition, activeRotation);
      }
    }
  }, [activeFrame]);

  useEffect(() => {
    if (activeFrame.name) {
      const handleSleep = () => {
        // setActiveFrame({ name: activeFrame.name });
        const currentActiveFrames = useStore.getState().activeFrames;
        if (!currentActiveFrames.includes(activeFrame.name)) {
          setActiveFrames(activeFrame.name);
        }
      };

      cameraControlsRef.current?.addEventListener("sleep", handleSleep);

      return () => {
        cameraControlsRef.current?.removeEventListener("sleep", handleSleep);
      };
    }
  }, [activeFrame]);
  console.log(activeFrames);
  useEffect(() => {
    const active = pages.filter((page) => page.name === `Project${project}`)[0];
    const activePosition = active?.position;
    const activeRotation = active?.rotation;
    if (project > 1 && project <= 6) {
      setActiveFrame({ name: `Project${project}` });
      setCameraLookAt(activePosition, activeRotation);
    }
  }, [project]);

  // useEffect(() => {
  //   if (isMenuClicked) setIsMenuClicked(false);
  // }, [activeFrame]);

  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        enabled={true}
        // minDistance={minDistance}
        // verticalDragToForward={verticalDragToForward}
        // dollyToCursor={dollyToCursor}
        // infinityDolly={infinityDolly}
      />
    </>
  );
};
export default memo(Navigation);
