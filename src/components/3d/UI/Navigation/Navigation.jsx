import { useStore } from "@/stores/store";
import { CameraControls } from "@react-three/drei";
import { memo, useEffect, useRef, useState } from "react";
import { pages } from "@/stores/data";
import { setCameraLookAt } from "@/components/3d/UI/Navigation/setCameraLookAt";
import { offsetY, offsetX, dist } from "@/stores/variables";
import { cameraInitCoor, camerainitLookAt } from "@/stores/variables";
import { Vector3 } from "three";

const Navigation = () => {
  const cameraControlsRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

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
  }, [arrowCount, activeMenuButton, plateClicked, htmlClicked, width]);
  console.log(Math.max(40, Math.min(52, width / 14)));
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
