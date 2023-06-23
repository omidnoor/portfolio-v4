import { useState } from "react";
import { useSpring } from "react-spring";

const usePushAnimation = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [{ positionScaleZ }, setPositionScaleZ] = useSpring(() => ({
    positionScaleZ: 1,
  }));

  const handlePointerDown = () => {
    setIsClicked(true);
    setPositionScaleZ({
      positionScaleZ: 0,
      loop: { reverse: true },
      config: { tension: 100, friction: 10 },
    });
  };

  const handlePointerUp = () => {
    setIsClicked(false);
    setPositionScaleZ({
      positionScaleZ: 1,
      loop: false,
      config: { tension: 500, friction: 10 },
    });
  };

  return { positionScaleZ, handlePointerDown, handlePointerUp };
};
export default usePushAnimation;
