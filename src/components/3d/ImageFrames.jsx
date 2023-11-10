import ImageFrame from "./ImageFrame";
import { Fragment, useEffect, useRef } from "react";
import { memo } from "react";
import { pages } from "@/stores/data";
import { useMatcapTexture } from "@react-three/drei";

const ImageFrames = () => {
  const framesRef = useRef({});

  const [matcapTexture] = useMatcapTexture("28292A_D3DAE5_A3ACB8_818183", 128);

  useEffect(() => {
    framesRef.current.frustumCulled = false;
  }, []);

  return (
    <group ref={framesRef} onPointerMissed={() => {}}>
      {pages?.map((props, index) => {
        if (!props.sub) {
          return (
            <Fragment key={index}>
              <ImageFrame {...props} matcapTexture={matcapTexture} />
            </Fragment>
          );
        }
        if (props.sub) {
          return props.sub.map((subProps, subIndex) => {
            return (
              <Fragment key={`${index}-${subIndex}`}>
                <ImageFrame {...subProps} matcapTexture={matcapTexture} />
              </Fragment>
            );
          });
        }
      })}
    </group>
  );
};
export default memo(ImageFrames);
