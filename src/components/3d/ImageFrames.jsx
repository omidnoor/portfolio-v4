import { useStore } from "@/stores/store";
import ImageFrame from "./ImageFrame";
import { useEffect, useRef, useState } from "react";
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

  const [matcapTexture] = useMatcapTexture("1B1B1B_515151_7E7E7E_6C6C6C", 256);

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
            <>
              <ImageFrame key={index} {...props} />
              {props.name === "About Me" && (
                <mesh ref={plateRef} {...props}>
                  <Plate matcapTexture={matcapTexture} />
                </mesh>
              )}
            </>
          );
        }
        if (props.sub) {
          return props.sub.map((subProps, subIndex) => {
            return (
              <>
                <ImageFrame key={`${index}-${subIndex}`} {...subProps} />
                <mesh ref={plateRef} {...subProps}>
                  <Plate matcapTexture={matcapTexture} {...subProps} />
                </mesh>
              </>
            );
          });
        }
      })}
    </group>
  );
};
export default memo(ImageFrames);
