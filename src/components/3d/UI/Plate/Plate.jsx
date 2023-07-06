import { useStore } from "@/stores/store";
import { useEffect } from "react";

const Plate = () => {
  const setPlateClicked = useStore((state) => state.setPlateClicked);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const arrowCount = useStore((state) => state.arrowCount);
  const setDollyCount = useStore((state) => state.setDollyCount);
  const setHtmlClicked = useStore((state) => state.setHtmlClicked);
  const setLastClick = useStore((state) => state.setLastClick);
  const lastClick = useStore((state) => state.lastClick);

  const handleClick = (e) => {
    e.stopPropagation();
    setPlateClicked(true);
    setDollyCount(1);
    setLastClick("plate");
    // setHtmlClicked(false);
  };
  const handleEnter = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handleLeave = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
  };

  useEffect(() => {
    setPlateClicked(false);
    setDollyCount(0);
  }, [isSceneClicked, activeMenuButton, arrowCount]);

  return (
    <mesh
      position={[15, 0, 0.05]}
      onClick={(e) => handleClick(e)}
      onPointerEnter={(e) => handleEnter(e)}
      onPointerLeave={(e) => handleLeave(e)}
    >
      <planeGeometry args={[7, 10]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};
export default Plate;
