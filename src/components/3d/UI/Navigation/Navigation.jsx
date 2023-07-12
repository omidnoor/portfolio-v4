import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pages } from "@/stores/data";
import { offsetY, offsetX, dist } from "@/stores/variables";
import { cameraInitCoor, camerainitLookAt } from "@/stores/variables";
import { Vector3 } from "three";
import { useWindowWidth } from "../../Utils/useWindowWidth";
import { useHandleClicks } from "./useHandleClicks";

const Navigation = () => {
  const cameraControlsRef = useRef(null);
  const width = useWindowWidth();
  const setCameraLookAt = useCallback(
    (
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
    },
    [],
  );

  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const arrowCount = useStore((state) => state.arrowCount);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const geoNormalArray = useStore((state) => state.geoNormalArray);
  const htmlClicked = useStore((state) => state.htmlClicked);
  const plateClicked = useStore((state) => state.plateClicked);

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
      offsetY,
      offsetX,
      activeMenuButton === "Home"
        ? dist - Math.max(33, Math.min(43.5, width / 14))
        : activeMenuButton === "Contact Me"
        ? dist - Math.max(33, Math.min(43.5, width / 14))
        : dist,
    );
  }, [activeMenuButton, width]);

  // useHandleClicks(cameraControlsRef, setCameraLookAt, activeMenuButton, width);

  useEffect(() => {
    if (active?.sub && normal && subPosition) {
      let normal = geoNormalArray
        .filter((geo) =>
          active.sub.some((subItem) => subItem.name === geo.name),
        )
        .map((item) => item.normal);
      const subPosition =
        active.sub[Math.abs(arrowCount % active.sub.length)]?.position;
      normal = normal[Math.abs(arrowCount % active.sub.length)];

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
          dist - Math.max(33, Math.min(43.5, width / 14)),
        );
      } else if (plateClicked) {
        setCameraLookAt(
          cameraControlsRef,
          subPosition,
          normal,
          offsetY,
          offsetX + 15,
          dist - Math.max(47.5, Math.min(51.5, width / 14)),
        );
      }
    }
  }, [
    arrowCount,
    activeMenuButton,
    plateClicked,
    htmlClicked,
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
        offsetY,
        offsetX,
        dist,
      );
      if (htmlClicked || plateClicked) {
        setCameraLookAt(
          cameraControlsRef,
          position,
          normalAboutMe,
          offsetY,
          offsetX + (plateClicked ? 21 : 0),
          dist - Math.max(33, Math.min(43.5, width / 14)),
        );
      }
    }
  }, [
    // arrowCount,
    activeMenuButton,
    plateClicked,
    htmlClicked,
    width,
    normalAboutMe,
    active,
  ]);
  console.log(
    arrowCount,
    activeMenuButton,
    plateClicked,
    htmlClicked,
    width,
    normalAboutMe,
    active,
  );
  useEffect(() => {
    if (normalContactMe && active?.position) {
      // let normal = geoNormalArray.find((geo) => geo.name === active?.name);
      const position = active?.position;
      setCameraLookAt(
        cameraControlsRef,
        position,
        normalContactMe,
        offsetY,
        offsetX,
        dist - Math.max(33, Math.min(43.5, width / 14)),
      );
    }
  }, [activeMenuButton, normalContactMe, width, normalContactMe]);

  return (
    <CameraControls
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
