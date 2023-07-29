import Layout from "@/components/3d/Layout";
import { Suspense } from "react";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";
import SceneModel from "@/components/3d/Models/SceneModel";

import Navigation from "@/components/3d/UI/Navigation/Navigation";
import ImageFrames from "@/components/3d/ImageFrames";
import Menu from "@/components/utilComponents/UI/Menu/Menu";
import Instruction from "@/components/utilComponents/UI/Instruction/Instruction";
import { useState } from "react";
import { useStore } from "@/stores/store";
import { useEffect } from "react";

const HomePage = () => {
  const [initPage, setInitPage] = useState(true);
  const isMenuButtonClicked = useStore((state) => state.isMenuButtonClicked);
  const isSceneClicked = useStore((state) => state.isSceneClicked);

  useEffect(() => {
    const time = setTimeout(() => {
      setInitPage(false);
    }, 5000);
    return () => clearTimeout(time);
  }, []);
  return (
    <>
      <Suspense fallback={null}>
        <Layout>
          <Navigation />
          <SceneModel />
          <ImageFrames />
        </Layout>
        {initPage && <Instruction />}
        <Menu />
      </Suspense>
      <CustomLoader />
    </>
  );
};
export default HomePage;
