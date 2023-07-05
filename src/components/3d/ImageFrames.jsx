import { useStore } from "@/stores/store";
import ImageFrame from "./ImageFrame";
import { useEffect, useRef, useState } from "react";
import { memo } from "react";
import { pages } from "@/stores/data";

const ImageFrames = () => {
  const framesRef = useRef({});
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const setActiveFrame = useStore((state) => state.setActiveFrame);
  const activeFrame = useStore((state) => state.activeFrame);
  useEffect(() => {
    framesRef.current.frustumCulled = false;
  }, []);
  return (
    <group
      ref={framesRef}
      onPointerMissed={() => {
        if (isSceneClicked) {
          setActiveFrame({ name: "" });
        }
      }}
    >
      {pages?.map((props, index) => {
        if (!props.sub) return <ImageFrame key={index} {...props} />;
        if (props.sub) {
          return props.sub.map((subProps, subIndex) => {
            return <ImageFrame key={`${index}-${subIndex}`} {...subProps} />;
          });
        }
      })}
    </group>
  );
};
export default memo(ImageFrames);
