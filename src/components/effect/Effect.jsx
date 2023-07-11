import { Bloom, EffectComposer } from "@react-three/postprocessing";
// import { BlurPass, Resizer, KernelSize, Resolution } from "postprocessing";
// import { DepthOfField } from "@react-three/postprocessing";

const Effect = () => {
  return (
    <EffectComposer multisampling={8}>
      {/* <DepthOfField
        focusDistance={0} // where to focus
        focalLength={0.12} // focal length
        bokehScale={2} // bokeh size
      /> */}
      {/* <Bloom
        intensity={3} // The bloom intensity.
        blurPass={undefined} // A blur pass.
        kernelSize={KernelSize.LARGE} // blur kernel size
        luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur={false} // Enables or disables mipmap blur.
        resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
        resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
      /> */}
    </EffectComposer>
  );
};
export default Effect;
