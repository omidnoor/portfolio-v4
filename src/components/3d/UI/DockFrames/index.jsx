import Card from "./Card/Card";
import { Dock } from "./Dock/Dock";
import { DockCard } from "./DockCard/DockCard";
import { DockDivider } from "./DockDivider/DockDivider";
import { pages } from "@/stores/data";
import BackButton from "./Card/BackButton";
import ContentMenu from "./ContentMenu";
import { Suspense } from "react";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";

export default function DockMenu() {
  return (
    <Suspense fallback={<CustomLoader />}>
      <Dock>
        <BackButton />
        <DockDivider />
        {pages.map((page, index) => (
          <DockCard key={page.name}>
            <Card page={page} />
          </DockCard>
        ))}
        <DockDivider />
        <ContentMenu />
      </Dock>
    </Suspense>
  );
}
