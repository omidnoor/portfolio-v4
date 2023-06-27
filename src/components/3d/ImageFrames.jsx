import { useStore } from "@/stores/store";
import ImageFrame from "./ImageFrame";
import { useEffect, useRef, useState } from "react";
import { memo } from "react";
import { pages } from "@/stores/data";

const ImageFrames = () => {
  const [pagesName, setPagesName] = useState([]);

  const framesRef = useRef({});
  const isMenuClicked = useStore((state) => state.isMenuClicked);
  const setActiveFrame = useStore((state) => state.setActiveFrame);

  return (
    <group
      ref={framesRef}
      onPointerMissed={() => {
        if (!isMenuClicked) {
          setActiveFrame({ name: "" });
        }
      }}
    >
      {pages?.map((props, index) => (
        <ImageFrame key={index} {...props} />
      ))}
    </group>
  );
};
export default memo(ImageFrames);
