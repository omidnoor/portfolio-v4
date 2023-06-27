import { useState } from "react";
import { useSpring } from "react-spring";

const usePushAnimation = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [{ positionScaleZ }, setPositionScaleZ] = useSpring(() => ({
    positionScaleZ: 0.7,
  }));

  const handlePointerDown = () => {
    setIsClicked(true);
    setPositionScaleZ({
      positionScaleZ: 0.2,
      // loop: { reverse: true },
      config: { tension: 100, friction: 10 },
    });
  };

  const handlePointerUp = () => {
    setIsClicked(false);
    setPositionScaleZ({
      positionScaleZ: 0.7,
      // loop: false,
      config: { tension: 500, friction: 10 },
    });
  };

  return { positionScaleZ, handlePointerDown, handlePointerUp };
};
export default usePushAnimation;
