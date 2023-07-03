import { useStore } from "@/stores/store";
import { pages } from "@/stores/data";

let subPosition = [0, 0, 0];

export const subNavigation = (activeMenuButton) => {
  //   const arrowButton = useStore((state) => state.arrowButton);
  //   const arrowCount = useStore((state) => state.arrowCount);
  //   const setArrowButton = useStore((state) => state.setArrowButton);
  //   const isSceneClicked = useStore((state) => state.isSceneClicked);

  const subs = pages.find((page) => page.name === activeMenuButton).sub;
  //   console.log(pages);
  if (subs) {
    // console.log(subs.map((sub) => sub.name));
  }
  return subs;
};
