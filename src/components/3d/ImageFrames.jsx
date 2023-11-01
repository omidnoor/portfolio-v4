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

  const [matcapTexture] = useMatcapTexture("28292A_D3DAE5_A3ACB8_818183", 128);

  useEffect(() => {
    framesRef.current.frustumCulled = false;
  }, []);

  return (
    <group
      ref={framesRef}
      onPointerMissed={() => {
        // if (isSceneClicked) {
        //   setActiveFrame({ name: "" });
        //   setActiveMenuButton("");
        //   setBackClicked(false);
        //   setImageClicked(false);
        //   setNoteClicked(false);
        // }
      }}
    >
      {pages?.map((props, index) => {
        if (!props.sub) {
          return (
            <Fragment key={index}>
              <ImageFrame {...props} matcapTexture={matcapTexture} />
              {/* {props.name === "About Me" && (
                <mesh ref={plateRef} {...props}>
                  <Plate matcapTexture={matcapTexture} plate={props.plate} />
                </mesh>
              )} */}
            </Fragment>
          );
        }
        if (props.sub) {
          return props.sub.map((subProps, subIndex) => {
            return (
              <Fragment key={`${index}-${subIndex}`}>
                <ImageFrame {...subProps} matcapTexture={matcapTexture} />
                {/* <mesh ref={plateRef} {...subProps}>
                  <Plate matcapTexture={matcapTexture} plate={subProps.plate} />
                </mesh> */}
              </Fragment>
            );
          });
        }
      })}
    </group>
  );
};
export default memo(ImageFrames);
