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
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const setBackClicked = useStore((state) => state.setBackClicked);
  const setImageClicked = useStore((state) => state.setImageClicked);
  const setNoteClicked = useStore((state) => state.setNoteClicked);

  useEffect(() => {
    framesRef.current.frustumCulled = false;
  }, []);
  return (
    <group
      ref={framesRef}
      onPointerMissed={() => {
        if (isSceneClicked) {
          setActiveFrame({ name: "" });
          setActiveMenuButton("");
          setBackClicked(false);
          setImageClicked(false);
          setNoteClicked(false);
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
