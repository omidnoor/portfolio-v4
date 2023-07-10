import { Bloom, EffectComposer } from "@react-three/postprocessing";

const AboutMeEffect = () => {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.2}
        blurPass={undefined}
        luminanceThreshold={0}
        luminanceSmoothing={0.01}
        mipmapBlur={false}
      />
    </EffectComposer>
  );
};
export default AboutMeEffect;
