import Home from "@/components/pageComponents/home/Home";
import { useStore } from "@/stores/store";
import { useEffect } from "react";

const PageHome = () => {
  const { activeMenuButton } = useStore((state) => state);
  useEffect(() => {
    // document.activeElement.blur();
  }, [activeMenuButton]);
  return <Home />;
};
export default PageHome;
