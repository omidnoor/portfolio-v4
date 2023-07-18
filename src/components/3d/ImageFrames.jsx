import { useStore } from "@/stores/store";
import ImageFrame from "./ImageFrame";
import { Fragment, useEffect, useRef, useState } from "react";
import { memo } from "react";
import { pages } from "@/stores/data";
import Plate from "./UI/Plate/Plate";
import { useMatcapTexture } from "@react-three/drei";

const ImageFrames = () => {
  const framesRef = useRef({});
  const plateRef = useRef(null);

  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const setActiveFrame = useStore((state) => state.setActiveFrame);
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const setBackClicked = useStore((state) => state.setBackClicked);
  const setImageClicked = useStore((state) => state.setImageClicked);
  const setNoteClicked = useStore((state) => state.setNoteClicked);

  const [matcapTexture] = useMatcapTexture("36220C_C6C391_8C844A_8B7B4C", 256);

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
        if (!props.sub) {
          return (
            <Fragment key={index}>
              <ImageFrame {...props} matcapTexture={matcapTexture} />
              {props.name === "About Me" && (
                <mesh ref={plateRef} {...props}>
                  <Plate matcapTexture={matcapTexture} plate={props.plate} />
                </mesh>
              )}
            </Fragment>
          );
        }
        if (props.sub) {
          return props.sub.map((subProps, subIndex) => {
            return (
              <Fragment key={`${index}-${subIndex}`}>
                <ImageFrame {...subProps} matcapTexture={matcapTexture} />
                <mesh ref={plateRef} {...subProps}>
                  <Plate matcapTexture={matcapTexture} plate={subProps.plate} />
                </mesh>
              </Fragment>
            );
          });
        }
      })}
    </group>
  );
};
export default memo(ImageFrames);
