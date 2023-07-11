import { useEffect } from "react";
import { useStore } from "@/stores/store";
import { pages } from "@/stores/data";
import { offsetY, offsetX, dist } from "@/stores/variables";

export function useHandleClicks(
  cameraControlsRef,
  setCameraLookAt,
  activeMenuButton,
  width,
) {
  const htmlClicked = useStore((state) => state.htmlClicked);
  const plateClicked = useStore((state) => state.plateClicked);
  const arrowCount = useStore((state) => state.arrowCount);
  const geoNormalArray = useStore((state) => state.geoNormalArray);

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
}
