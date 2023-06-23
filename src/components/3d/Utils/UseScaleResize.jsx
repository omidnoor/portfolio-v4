import { useEffect } from "react";

const useScaleOnResize = (ref, minScale = 0.5, maxScale = 2) => {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Logarithmic scaling
      const scale = Math.log2(width / 1000 + 0.1);

      // Clamping the scale
      const clampedScale = Math.max(minScale, Math.min(maxScale, scale));

      if (ref.current) {
        ref.current.scale.set(clampedScale, clampedScale, clampedScale);
      }
    };

    // Initial scaling
    handleResize();

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, minScale, maxScale]);
};

export default useScaleOnResize;
