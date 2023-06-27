import Layout from "@/components/3d/Layout";
import { Suspense } from "react";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";
import SceneModel from "@/components/3d/Models/SceneModel";
import Menu from "@/components/3d/UI/Menu/Menu";
import ResponsiveCamera from "@/components/3d/Utils/ReponsiveCamera";
import Navigation from "@/components/3d/UI/Navigation/Navigation";
import ImageFrames from "@/components/3d/ImageFrames";

const HomePage = () => {
  return (
    <>
      <Layout>
        <ResponsiveCamera />
        <Suspense fallback={<CustomLoader />}>
          <Navigation />
          <group position={[0, -0.9, 0]}>
            <SceneModel />
            <ImageFrames />
            <Menu />
          </group>
        </Suspense>
      </Layout>
    </>
  );
};
export default HomePage;
