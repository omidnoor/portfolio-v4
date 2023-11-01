import { Bloom, EffectComposer } from "@react-three/postprocessing";

const AboutMeEffect = () => {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.7}
        blurPass={undefined}
        luminanceThreshold={0}
        luminanceSmoothing={0.9}
        mipmapBlur={false}
      />
    </EffectComposer>
  );
};
export default AboutMeEffect;
