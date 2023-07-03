import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import { pages } from "@/stores/data";
import CameraInit from "./CameraInit";
import { setCameraLookAt } from "@/components/3d/UI/Navigation/setCameraLookAt";
import { offset, dist } from "@/stores/variables";
import { subNavigation } from "./subNavigation";
import { clone } from "lodash";

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
    setCameraLookAt(
      cameraControlsRef,
      activePosition,
      normal?.normal,
      offset,
      dist,
    );
  }, [activeMenuButton]);

  useEffect(() => {
    console.log(geoNormalArray);
    const active = pages.find((page) => page.name === activeMenuButton);
    const normal = geoNormalArray.find((geo) => geo.name === active?.name);
    if (!!active?.sub) {
      const subPosition = active.sub[arrowCount % active.sub.length]?.position;
      setCameraLookAt(
        cameraControlsRef,
        subPosition,
        normal?.normal,
        offset,
        dist,
      );
    }
  }, [arrowCount]);

  return (
    <>
      {/* <CameraInit cameraControlsRef={cameraControlsRef} /> */}
      <CameraControls ref={cameraControlsRef} enabled={true} />
    </>
  );
};
export default memo(Navigation);
