import Layout from "@/components/3d/Layout";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";
import { Inter } from "next/font/google";
import SceneModel from "@/components/3d/Models/SceneModel";
import TargetCamera from "@/components/3d/Utils/TargetCamera";
import Menu from "@/components/3d/UI/Menu/Menu";
import ResponsiveCamera from "@/components/3d/Utils/ReponsiveCamera";
import CameraTravel from "@/components/3d/Utils/CameraTravel";
import Navigation from "@/components/3d/UI/Navigation/Navigation";
import MenuPlate from "@/components/3d/UI/Menu/MenuPlate";
import Frames from "@/components/3d/UI/Frames/Frames";
import ImageFrames from "@/components/3d/ImageFrames";

const inter = Inter({ subsets: ["latin"] });

const pages = [
  {
    name: "Home",
    position: [3.6, 2.5, -12.33],
    rotation: [0, 0, 0],
    url: "http://localhost:3000/PageAboutMe",
  },
  {
    name: "AboutMe",
    position: [-1.45, 1, 0.25],
    rotation: [0, Math.PI * 0.25, 0],
    url: "http://localhost:3000/PageAboutMe",
  },
  {
    name: "ContactMe",
    position: [1.45, 1, 0.25],
    rotation: [0, -Math.PI * 0.25, 0],
    url: "http://localhost:3000/PageContactMe",
  },
  {
    name: "Projects",
    position: [-2.15, 1, 1.5],
    rotation: [0, Math.PI * 0.25, 0],
    url: "http://localhost:3000/PageProjects",
  },
  {
    name: "Testimonials",
    position: [12.1, 2.5, -3.7],
    rotation: [0, -Math.PI * 0.5, 0],
    url: "http://localhost:3000/PageTestimonials",
  },
];
const HomePage = () => {
  const domContentRef = useRef(null);

  return (
    <>
      <Layout>
        <Suspense fallback={<CustomLoader />}>
          <ResponsiveCamera />
          <Navigation />
          <group position={[0, -0.9, 0]}>
            <SceneModel />
            <ImageFrames pages={pages} />
            {/* <Menu /> */}
          </group>
        </Suspense>
      </Layout>
    </>
  );
};
export default HomePage;
