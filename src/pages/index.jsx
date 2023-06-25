import Layout from "@/components/3d/Layout";
import { Suspense } from "react";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";
import { Inter } from "next/font/google";
import SceneModel from "@/components/3d/Models/SceneModel";
import Menu from "@/components/3d/UI/Menu/Menu";
import ResponsiveCamera from "@/components/3d/Utils/ReponsiveCamera";
import Navigation from "@/components/3d/UI/Navigation/Navigation";
import ImageFrames from "@/components/3d/ImageFrames";

const inter = Inter({ subsets: ["latin"] });

const pages = [
  {
    name: "Home",
    position: [3.6, 2.5, -12.33],
    rotation: [0, 0, 0],
    url: "http://localhost:3000/PageHome",
  },
  {
    name: "About Me",
    position: [0.15, 2.5, 18],
    rotation: [0, Math.PI * 0.5, 0],
    url: "http://localhost:3000/PageAboutMe",
  },
  {
    name: "Contact Me",
    position: [12.37, 2.5, -8.6],
    rotation: [0, -Math.PI * 0.5, 0],
    url: "http://localhost:3000/PageContactMe",
  },
  {
    name: "Testimonials",
    position: [12.35, 2.5, -3.7],
    rotation: [0, -Math.PI * 0.5, 0],
    url: "http://localhost:3000/PageTestimonials",
  },
  // {
  //   name: "Projects",
  //   position: [-2.15, 1, 1.5],
  //   rotation: [0, Math.PI * 0, 0],
  //   url: "http://localhost:3000/PageProjects",
  // },
  {
    name: "Project1",
    position: [-10, 2.5, -25],
    rotation: [0, Math.PI * 0, 0],
    url: "http://localhost:3000/PageProjects",
  },
  {
    name: "Project2",
    position: [-6, 2.5, -25],
    rotation: [0, Math.PI * 0, 0],
    url: "http://localhost:3000/PageProjects",
  },
  {
    name: "Project3",
    position: [-2, 2.5, -25],
    rotation: [0, Math.PI * 0, 0],
    url: "http://localhost:3000/PageProjects",
  },
  {
    name: "Project4",
    position: [2, 2.5, -25],
    rotation: [0, Math.PI * 0, 0],
    url: "http://localhost:3000/PageProjects",
  },
  {
    name: "Project5",
    position: [6, 2.5, -25],
    rotation: [0, Math.PI * 0, 0],
    url: "http://localhost:3000/PageProjects",
  },
  {
    name: "Project6",
    position: [10, 2.5, -25],
    rotation: [0, Math.PI * 0, 0],
    url: "http://localhost:3000/PageProjects",
  },
];
const HomePage = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<CustomLoader />}>
          <ResponsiveCamera />
          <Navigation pages={pages} />
          <group position={[0, -0.9, 0]}>
            <SceneModel />
            <ImageFrames pages={pages} />
            <Menu pages={pages} />
          </group>
        </Suspense>
      </Layout>
    </>
  );
};
export default HomePage;
