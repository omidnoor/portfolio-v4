import Layout from "@/components/3d/Layout";
import { Suspense, useState } from "react";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";
import SceneModel from "@/components/3d/Models/SceneModel";
import ResponsiveCamera from "@/components/3d/Utils/ReponsiveCamera";
import Navigation from "@/components/3d/UI/Navigation/Navigation";
import ImageFrames from "@/components/3d/ImageFrames";
import Menu from "@/components/utilComponents/UI/Menu/Menu";
import Plate from "@/components/3d/UI/Plate/Plate";
import Effect from "@/components/effect/Effect";

const HomePage = () => {
  return (
    <>
      <Layout>
        {/* <Suspense fallback={<CustomLoader />}> */}
        <Navigation />
        <SceneModel />
        <ImageFrames />
        {/* </Suspense> */}
      </Layout>
      <Menu />
    </>
  );
};
export default HomePage;
