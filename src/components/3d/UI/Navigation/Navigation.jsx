import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pages } from "@/stores/data";
import { offsetY, offsetX, dist } from "@/stores/variables";
import { cameraInitCoor, camerainitLookAt } from "@/stores/variables";
import { Vector3 } from "three";
import { useWindowWidth } from "../../Utils/useWindowWidth";
import { useHandleClicks } from "./useHandleClicks";
import useCameraFreez from "./useCameraFreez";
import ResponsiveCamera from "./ResponsiveCamera";
import { useThree } from "@react-three/fiber";
// import useCameraFreez from "./useCameraFreez";

const Navigation = () => {
  const cameraControlsRef = useRef(null);
  const width = useWindowWidth();
  // useCameraFreez(cameraControlsRef);
  const {
    isLetsTalk,
    isServices,
    plateClicked,
    htmlClicked,
    geoNormalArray,
    activeMenuButton,
    arrowCount,
    isSceneClicked,
    isDragging,
    backClicked,
  } = useStore();

  const setCameraLookAt = useCallback(
    (
      cameraControlsRef,
      position = [0, 25, -44],
      normal = new Vector3(0, 0, 1),
      offset1 = 1,
      offset2 = 0,
      dist = 70,
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

      cameraControlsRef.current?.setLookAt(
        lookAtPos.x,
        lookAtPos.y - offset1,
        lookAtPos.z,
        toPos.x,
        toPos.y - offset1,
        toPos.z,
        true,
      );
    },
    [],
  );
  // console.log(backClicked);
  const active = useMemo(
    () => pages.find((page) => page.name === activeMenuButton),
    [activeMenuButton],
  );
  const normals = useMemo(
    () =>
      active?.sub
        ? geoNormalArray
            .filter((geo) =>
              active.sub.some((subItem) => subItem.name === geo.name),
            )
            .map((item) => item.normal)
        : [],
    [geoNormalArray, active],
  );

  const subPosition = useMemo(
    () =>
      active?.sub
        ? active.sub[Math.abs(arrowCount % active.sub.length)]?.position
        : null,
    [arrowCount, active],
  );

  const normal = useMemo(
    () => (normals ? normals[Math.abs(arrowCount % normals.length)] : null),
    [arrowCount, normals],
  );

  const normalAboutMe = useMemo(
    () =>
      activeMenuButton === "About Me"
        ? geoNormalArray.find((geo) => geo.name === active?.name)?.normal
        : null,
    [activeMenuButton, geoNormalArray, active],
  );

  const normalContactMe = useMemo(() => {
    if (activeMenuButton === "Contact Me") {
      const contactPage = geoNormalArray.find(
        (geo) => geo.name === "Contact Me",
      );
      return contactPage ? contactPage.normal : null;
    }
    return null;
  }, [activeMenuButton, geoNormalArray]);

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(
      ...cameraInitCoor,
      ...camerainitLookAt,
      true,
    );
  }, [isSceneClicked, activeMenuButton]);

  useEffect(() => {
    const activePosition = active?.position;
    setCameraLookAt(
      cameraControlsRef,
      activePosition,
      normal?.normal,
      offsetY - 1,
      offsetX,
      activeMenuButton === "Home"
        ? dist - Math.max(20, Math.min(46, width / 40)) + 12
        : activeMenuButton === "Contact Me"
        ? dist - Math.max(20, Math.min(43, width / 8))
        : !activeMenuButton
        ? 100 - Math.max(10, Math.min(40, width / 30))
        : dist,
    );
  }, [activeMenuButton, width, backClicked]);
  // useHandleClicks(cameraControlsRef, setCameraLookAt, activeMenuButton, width);

  useEffect(() => {
    if (active?.sub && normal && subPosition) {
      const l = active.sub.length;
      console.log((Math.ceil(Math.abs(arrowCount / l)) * l + arrowCount) % l);
      let normal = geoNormalArray
        .filter((geo) =>
          active.sub.some((subItem) => subItem.name === geo.name),
        )
        .map((item) => item.normal);
      const subPosition =
        active.sub[(Math.ceil(Math.abs(arrowCount / l)) * l + arrowCount) % l]
          ?.position;
      normal =
        normal[(Math.ceil(Math.abs(arrowCount / l)) * l + arrowCount) % l];

      setCameraLookAt(
        cameraControlsRef,
        subPosition,
        normal,
        offsetY - 1.2,
        offsetX,
        dist - Math.max(10, Math.min(35, width / 35)),
      );
      // if (htmlClicked || plateClicked) {
      //   setCameraLookAt(
      //     cameraControlsRef,
      //     subPosition,
      //     normal,
      //     offsetY,
      //     offsetX + (plateClicked ? 21 : 0),
      //     dist - Math.max(10, Math.min(40, width / 30)),
      //   );
      // }
    }
  }, [
    arrowCount,
    activeMenuButton,
    plateClicked,
    htmlClicked,
    isLetsTalk,
    isServices,
    width,
    normal,
    subPosition,
  ]);
  useEffect(() => {
    if (normalAboutMe && active?.position) {
      const position = active?.position;
      setCameraLookAt(
        cameraControlsRef,
        position,
        normalAboutMe,
        offsetY - 0.5,
        offsetX,
        dist - Math.max(2, Math.min(33, width / 50)),
      );
      // if (htmlClicked || plateClicked) {
      //   setCameraLookAt(
      //     cameraControlsRef,
      //     position,
      //     normalAboutMe,
      //     offsetY,
      //     offsetX + (plateClicked ? 21 : 0),
      //     dist - Math.max(33, Math.min(43.5, width / 14)),
      //   );
      // }
    }
  }, [
    // arrowCount,
    isServices,
    isLetsTalk,
    activeMenuButton,
    plateClicked,
    htmlClicked,
    width,
    normalAboutMe,
    active,
  ]);

  useEffect(() => {
    if (normalContactMe && active?.position) {
      // let normal = geoNormalArray.find((geo) => geo.name === active?.name);
      const position = active?.position;
      setCameraLookAt(
        cameraControlsRef,
        position,
        normalContactMe,
        offsetY - 2,
        offsetX,
        dist - Math.max(33, Math.min(43.5, width / 14)),
      );
    }
  }, [
    activeMenuButton,
    normalContactMe,
    width,
    normalContactMe,
    isServices,
    isLetsTalk,
  ]);
  return (
    <CameraControls
      ref={cameraControlsRef}
      enabled={!isDragging}
      makeDefault={false}
      verticalDragToForward={false}
      dollyToCursor={false}
      dollyDragInverted={false}
      infinityDolly={true}
      minZoom={0}
      maxZoom={0}
    />
  );
};
export default memo(Navigation);
