import { useStore } from "@/stores/store";
import {
  Center,
  Effects,
  GradientTexture,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Text,
  Text3D,
  useCursor,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import { a, useSpring } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRouter } from "next/router";

const AnimatedMaterial = a(MeshDistortMaterial);

const ThreeDActions = () => {
  const router = useRouter();
  // const [matcapTexture] = useMatcapTexture("1B1B1B_999999_575757_747474", 128);
  const serviceRef = useRef();
  const lestTalkRef = useRef();
  const [down, setDown] = useState(false);
  const [letsTalkHovered, setLetsTalkHovered] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);
  useCursor(letsTalkHovered);
  useCursor(servicesHovered);

  const {
    setIsLetsTalk,
    setIsServices,
    isLetsTalk,
    isServices,
    setActiveMenuButton,
    activeMenuButton,
  } = useStore((state) => state);

  const texture = useLoader(THREE.TextureLoader, "./Flag_of_Canada.png");

  useFrame(() => {
    lestTalkRef.current.distort = THREE.MathUtils.lerp(
      lestTalkRef.current.distort,
      letsTalkHovered ? 0.4 : 0,
      letsTalkHovered ? 0.05 : 0.01,
    );
    serviceRef.current.distort = THREE.MathUtils.lerp(
      serviceRef.current.distort,
      servicesHovered ? 0.4 : 0,
      servicesHovered ? 0.05 : 0.01,
    );
  });

  useEffect(() => {
    if (isLetsTalk) {
      setActiveMenuButton("Contact Me");
      window.parent.postMessage({
        type: "updateState",
        payload: "Contact Me",
      });
      router.push("/PageContactMe");
      setIsLetsTalk(false);
    }
    if (isServices) {
      setActiveMenuButton("About Me");
      window.parent.postMessage({
        type: "updateState",
        payload: "About Me",
      });
      setIsServices(false);
    }
    document.activeElement.blur();
  }, [isLetsTalk, isServices]);
  return (
    <group position={[0, -20, 0]} rotation={[0, 0, 0]}>
      <a.mesh
        position={[-30, -10, 0]}
        scale={30}
        onClick={(e) => {
          setIsLetsTalk(true);
          // handleClicks(e);
        }}
        onPointerOver={() => setLetsTalkHovered(true)}
        onPointerOut={() => setLetsTalkHovered(false)}
      >
        <Text font="/Inter-Bold.woff" color="#0c020e" fontSize={0.2}>
          Let's Talk
        </Text>
        <planeGeometry args={[1.2, 0.4, 32, 32]} position={[0, 0, 0]} />

        <AnimatedMaterial ref={lestTalkRef} speed={5}>
          {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
          <GradientTexture
            stops={[0, 0.3, 0.6, 1]}
            colors={["#ffc800", "#ffc800", "#ffc800", "#ffc800"]}
            size={100}
          />
        </AnimatedMaterial>
      </a.mesh>
      <a.mesh
        position={[30, -10, 0]}
        scale={30}
        onClick={(e) => {
          setIsServices(true);
          // handleClicks(e);
        }}
        onPointerOver={() => setServicesHovered(true)}
        onPointerOut={() => setServicesHovered(false)}
      >
        <Text font="/Inter-Bold.woff" color="#0c020e" fontSize={0.2}>
          Services
        </Text>
        <planeGeometry args={[1.2, 0.4, 32, 32]} position={[0, 0, 0]} />
        <AnimatedMaterial ref={serviceRef} speed={5}>
          <GradientTexture
            stops={[0, 0.2, 0.8, 1]}
            colors={["#ffd0ff", "#ffd0ff", "#ffd0ff", "#ffd0ff"]}
            size={100}
          />
        </AnimatedMaterial>
      </a.mesh>
    </group>
  );
};
export default ThreeDActions;

function TextTemplate3D({
  children,
  position,
  onClick,
  onPointerOver,
  onPointerLeave,
  font = "/inter_Bold.json",
  ...props
}) {
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr",
  );
  return (
    <>
      <group
        position={position}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerLeave={onPointerLeave}
      >
        <mesh>
          <planeGeometry args={[40, 16]} position={[0, 0, 0]} />
          <meshPhongMaterial color="#ff0000" opacity={0.1} transparent />
          <Text3D
            castShadow
            bevelEnabled
            font={font}
            scale={10}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={10}
            curveSegments={128}
            bevelThickness={0.01}
          >
            {children}
            <MeshTransmissionMaterial
              color="#0f0f00"
              transmission={0.1}
              /* Thickness (refraction), default: 0 */
              thickness={0.01}
              /** Backside thickness (when backside is true), default: 0 */
              backsideThickness={0.01}
              /* Roughness (blur), default: 0 */
              roughness={0.01}
              /* Chromatic aberration, default: 0.03 */
              chromaticAberration={0.03}
              /* Anisotropy, default: 0.1 */
              anisotropicBlur={0.9}
              /* Distortion, default: 0 */
              distortion={0}
              /* Distortion scale, default: 0.5 */
              distortionScale={1}
              /* Temporal distortion (speed of movement), default: 0.0 */
              temporalDistortion={1}
              /** The scene rendered into a texture (use it to share a texture between materials), default: null  */

              transmissionSampler={true}
              /** Render the backside of the material (more cost, better results), default: false */
              backside={false}
              /** Resolution of the local buffer, default: undefined (fullscreen) */
              resolution={undefined}
              /** Resolution of the local buffer for backfaces, default: undefined (fullscreen) */
              backsideResolution={undefined}
              /** Refraction samples, default: 6 */
              samples={1}
              /** Buffer scene background (can be a texture, a cubetexture or a color), default: null */
              background={texture}
            />
          </Text3D>
        </mesh>
        {/* <Center scale={[0.8, 1, 1]} front top> */}
        {/* </Center> */}
      </group>
    </>
  );
}
