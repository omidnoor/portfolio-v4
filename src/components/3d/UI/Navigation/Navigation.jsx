import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import { pages } from "@/stores/data";
import { setCameraLookAt } from "@/components/3d/UI/Navigation/setCameraLookAt";
import { offset, dist } from "@/stores/variables";
import { cameraInitCoor, camerainitLookAt } from "@/stores/variables";

const Navigation = () => {
  const cameraControlsRef = useRef(null);

  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const arrowButton = useStore((state) => state.arrowButton);
  const arrowCount = useStore((state) => state.arrowCount);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const geoNormalArray = useStore((state) => state.geoNormalArray);

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(
      ...cameraInitCoor,
      ...camerainitLookAt,
      true,
    );
  }, [isSceneClicked, activeMenuButton]);

  useEffect(() => {
    const active = pages.find((page) => page.name === activeMenuButton);
    const normal = geoNormalArray.find((geo) => geo.name === active?.name);
    const activePosition = active?.position;
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
      let normal = geoNormalArray
        .filter((geo) =>
          active.sub.some((subItem) => subItem.name === geo.name),
        )
        .map((item) => item.normal);
      const subPosition =
        active.sub[Math.abs(arrowCount % active.sub.length)]?.position;
      normal = normal[Math.abs(arrowCount % active.sub.length)];

      setCameraLookAt(cameraControlsRef, subPosition, normal, offset, dist);
    }
  }, [arrowCount, activeMenuButton]);

  return (
    <CameraControls
      cameraUp={[-20, 25, 50]}
      ref={cameraControlsRef}
      enabled={true}
      makeDefault={true}
      verticalDragToForward={true}
      dollyToCursor={true}
      infinityDolly={true}
    />
  );
};
export default memo(Navigation);
