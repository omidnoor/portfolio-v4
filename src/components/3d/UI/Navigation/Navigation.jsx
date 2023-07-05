import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import { pages } from "@/stores/data";
import CameraInit from "./CameraInit";
import { setCameraLookAt } from "@/components/3d/UI/Navigation/setCameraLookAt";
import { offset, dist } from "@/stores/variables";
import { subNavigation } from "./subNavigation";

const Navigation = () => {
  const cameraControlsRef = useRef(null);

  const arrowButton = useStore((state) => state.arrowButton);
  const arrowCount = useStore((state) => state.arrowCount);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const geoNormalArray = useStore((state) => state.geoNormalArray);

  useEffect(() => {
    // setActiveMenuButton("");
  }, []);

  useEffect(() => {
    if (!activeMenuButton) setActiveMenuButton("");
    const active = pages.find((page) => page.name === activeMenuButton);
    const normal = geoNormalArray.find((geo) => geo.name === active?.name);
    const activePosition = active?.position;
    console.log(geoNormalArray);
    setCameraLookAt(
      cameraControlsRef,
      activePosition,
      normal?.normal,
      offset,
      dist,
    );
  }, [activeMenuButton]);

  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    if (active?.sub) {
      // console.log(active.sub);
      let normal = geoNormalArray
        .filter((geo) =>
          active.sub.some((subItem) => subItem.name === geo.name),
        )
        .map((item) => item.normal);
      const subPosition = active.sub[arrowCount % active.sub.length]?.position;
      normal = normal[arrowCount % active.sub.length];
      setCameraLookAt(cameraControlsRef, subPosition, normal, offset, dist);
    }
  }, []);

  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    if (active?.sub) {
      // console.log(active.sub);
      let normal = geoNormalArray
        .filter((geo) =>
          active.sub.some((subItem) => subItem.name === geo.name),
        )
        .map((item) => item.normal);
      const subPosition =
        active.sub[Math.abs(arrowCount % active.sub.length)]?.position;
      normal = normal[Math.abs(arrowCount % active.sub.length)];
      // console.log(
      //   active.sub[Math.abs(arrowCount % active.sub.length)],
      //   Math.abs(arrowCount % active.sub.length),
      // );
      setCameraLookAt(cameraControlsRef, subPosition, normal, offset, dist);
    }
  }, [arrowCount]);

  return (
    <>
      <CameraInit cameraControlsRef={cameraControlsRef} />
      <CameraControls ref={cameraControlsRef} enabled={true} />
    </>
  );
};
export default memo(Navigation);
