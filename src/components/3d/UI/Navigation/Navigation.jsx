import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import { pages } from "@/stores/data";
import { setCameraLookAt } from "@/components/3d/UI/Navigation/setCameraLookAt";
import { offsetY, offsetX, dist } from "@/stores/variables";
import { cameraInitCoor, camerainitLookAt } from "@/stores/variables";
import { Vector3 } from "three";

const Navigation = () => {
  const cameraControlsRef = useRef(null);

  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const arrowCount = useStore((state) => state.arrowCount);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const geoNormalArray = useStore((state) => state.geoNormalArray);
  const htmlClicked = useStore((state) => state.htmlClicked);
  const plateClicked = useStore((state) => state.plateClicked);
  const lastClick = useStore((state) => state.lastClick);
  const setNoteClicked = useStore((state) => state.setNoteClicked);
  const noteClicked = useStore((state) => state.noteClicked);
  const setImageClicked = useStore((state) => state.setImageClicked);
  const imageClicked = useStore((state) => state.imageClicked);
  const backClicked = useStore((state) => state.backClicked);
  const frameRef = useStore((state) => state.frameRef);

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(
      ...cameraInitCoor,
      ...camerainitLookAt,
      true,
    );
  }, [isSceneClicked, activeMenuButton, backClicked]);

  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    const normal = geoNormalArray.find((geo) => geo.name === active?.name);
    const activePosition = active?.position;
    setCameraLookAt(
      cameraControlsRef,
      activePosition,
      normal?.normal,
      offsetY,
      offsetX,
      active?.name === "Home"
        ? dist - 20
        : active?.name === "Contact Me"
        ? dist - 47
        : dist,
    );
  }, [activeMenuButton]);

  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    if (active?.sub) {
      let normal = geoNormalArray
        .filter((geo) =>
          active.sub.some((subItem) => subItem.name === geo.name),
        )
        .map((item) => item.normal);
      const subPosition =
        active.sub[Math.abs(arrowCount % active.sub.length)]?.position;
      normal = normal[Math.abs(arrowCount % active.sub.length)];

      // const targetDist =
      setCameraLookAt(
        cameraControlsRef,
        subPosition,
        normal,
        offsetY,
        offsetX,
        dist,
      );
      if (htmlClicked) {
        setCameraLookAt(
          cameraControlsRef,
          subPosition,
          normal,
          offsetY,
          offsetX,
          dist - 43,
        );
      } else if (plateClicked) {
        setCameraLookAt(
          cameraControlsRef,
          subPosition,
          normal,
          offsetY,
          offsetX + 13,
          dist - 52,
        );
      }
    }
  }, [arrowCount, activeMenuButton, plateClicked, htmlClicked]);
  console.log(htmlClicked, plateClicked);
  // const truckMove = (dir) => {
  //   cameraControlsRef.current?.truck((dir ? 1 : -1) * 13, 0, true);
  //   // setCameraLookAt(cameraControlsRef, subPosition, normal, offsetY,offsetX, dist);
  // };

  // const dollyMove = (dollyDist) => {
  //   cameraControlsRef.current?.dolly(dollyDist, true);
  // };

  // useEffect(() => {
  //   const active = pages.find((page) => page.name === activeMenuButton);
  //   console.log(active, activeMenuButton);

  //   if (activeMenuButton === "Projects" || activeMenuButton === "About Me") {
  //     const subArray =
  //       active.sub && active.sub[Math.abs(arrowCount % active.sub.length)];

  //     const ref = frameRef.find((item) => item?.name === subArray?.name);

  //     if ((htmlClicked && !plateClicked) || (imageClicked && !noteClicked))
  //     ref && cameraControlsRef.current?.fitToBox(ref, true);

  //     if ((!htmlClicked && plateClicked) || (!imageClicked && noteClicked)) {
  //       truckMove(true);
  //       dollyMove(50);
  //     }
  //     if (
  //       (htmlClicked && plateClicked && lastClick === "plate") ||
  //       (imageClicked && noteClicked && lastClick === "plate")
  //     ) {
  //       truckMove(true);
  //       dollyMove(15);
  //     } else if (
  //       (htmlClicked && plateClicked && lastClick === "html") ||
  //       (imageClicked && noteClicked && lastClick === "html")
  //     ) {
  //       truckMove(false);
  //       dollyMove(-15);
  //     }
  //   }
  // }, [plateClicked, htmlClicked, lastClick, imageClicked, noteClicked]);

  return (
    <CameraControls
      // cameraUp={[-20, 25, 50]}
      ref={cameraControlsRef}
      enabled={true}
      makeDefault={false}
      verticalDragToForward={false}
      dollyToCursor={false}
      dollyDragInverted={false}
      infinityDolly={false}
      // minZoom={10}
      // maxZoom={20}
    />
  );
};
export default memo(Navigation);
