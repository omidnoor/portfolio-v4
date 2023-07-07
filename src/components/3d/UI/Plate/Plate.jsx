import { useStore } from "@/stores/store";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useEffect } from "react";
import PlateContent from "./PlateContent";

const Plate = () => {
  const setPlateClicked = useStore((state) => state.setPlateClicked);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const arrowCount = useStore((state) => state.arrowCount);
  const setDollyCount = useStore((state) => state.setDollyCount);
  const setLastClick = useStore((state) => state.setLastClick);

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
    <>
      <mesh
        position={[15, 0, 0.15]}
        onClick={(e) => handleClick(e)}
        onPointerEnter={(e) => handleEnter(e)}
        onPointerLeave={(e) => handleLeave(e)}
      >
        <planeGeometry args={[8.5, 11.5]} />
        <meshStandardMaterial
          color="#fcfcdc"
          roughness={0.8}
          metalness={0.05}
        />
        <PlateContent />
      </mesh>
      <mesh position={[15, 0, 0.1]}>
        <planeGeometry args={[9.5, 12.5]} />
        <MeshReflectorMaterial color="#cfcded" roughness={0} metalness={0.95} />
      </mesh>
    </>
  );
};
export default Plate;
