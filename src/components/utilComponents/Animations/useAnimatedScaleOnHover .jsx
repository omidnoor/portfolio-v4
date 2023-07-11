import { useSprings } from "react-spring";

export const useAnimatedScaleOnHover = () => {
  const [props, api] = useSprings(2, () => ({
    from: { scale: 1 },
    config: {
      mass: 1,
      tension: 100,
      friction: 5,
    },
  }));

  const handleEnterLink = (index) => {
    api.start((i) => (i === index ? { scale: 1.2 } : {}));
  };

  const handleLeaveLink = (index) => {
    api.start((i) => (i === index ? { scale: 1 } : {}));
  };

  return { props, handleEnterLink, handleLeaveLink };
};
