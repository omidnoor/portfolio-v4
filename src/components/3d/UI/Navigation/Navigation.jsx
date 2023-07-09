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
      offset,
      active?.name === "Home"
        ? dist - 20
        : active?.name === "Contact Me"
        ? dist - 45
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

      setCameraLookAt(cameraControlsRef, subPosition, normal, offset, dist);
    }
  }, [arrowCount, activeMenuButton]);

  const truckMove = (dir) => {
    cameraControlsRef.current?.truck((dir ? 1 : -1) * 13, 0, true);
    // setCameraLookAt(cameraControlsRef, subPosition, normal, offset, dist);
  };

  const dollyMove = (dollyDist) => {
    cameraControlsRef.current?.dolly(dollyDist, true);
  };

  useEffect(() => {
    if (activeMenuButton === "Projects") {
      if ((htmlClicked && !plateClicked) || (imageClicked && !noteClicked))
        dollyMove(35);

      if ((!htmlClicked && plateClicked) || (!imageClicked && noteClicked)) {
        truckMove(true);
        dollyMove(50);
      }
      if (
        (htmlClicked && plateClicked && lastClick === "plate") ||
        (imageClicked && noteClicked && lastClick === "plate")
      ) {
        truckMove(true);
        dollyMove(15);
      } else if (
        (htmlClicked && plateClicked && lastClick === "html") ||
        (imageClicked && noteClicked && lastClick === "html")
      ) {
        truckMove(false);
        dollyMove(-15);
      }
    }
  }, [plateClicked, htmlClicked, lastClick, imageClicked, noteClicked]);

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
