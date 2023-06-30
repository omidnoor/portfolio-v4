import Layout from "@/components/3d/Layout";
import { Suspense, useState } from "react";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";
import SceneModel from "@/components/3d/Models/SceneModel";
import ResponsiveCamera from "@/components/3d/Utils/ReponsiveCamera";
import Navigation from "@/components/3d/UI/Navigation/Navigation";
import ImageFrames from "@/components/3d/ImageFrames";
import Menu from "@/components/utilComponents/UI/Menu/Menu";
import ProjectsMenu from "@/components/utilComponents/UI/ProjectsMenu/ProjectsMenu";

const HomePage = () => {
  return (
    <>
      <Menu />
      <ProjectsMenu />
      <Layout>
        <ResponsiveCamera />
        <Suspense fallback={<CustomLoader />}>
          <group position={[0, -0.9, 0]}>
            <SceneModel />
            <ImageFrames />
          </group>
          <Navigation />
        </Suspense>
      </Layout>
    </>
  );
};
export default HomePage;
