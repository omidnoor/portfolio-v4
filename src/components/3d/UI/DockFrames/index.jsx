import { useStore } from "@/stores/store";
import Card from "./Card/Card";
import { Dock } from "./Dock/Dock";
import { DockCard } from "./DockCard/DockCard";
import { DockDivider } from "./DockDivider/DockDivider";
import { pages } from "@/stores/data";
import DockArrow from "./Card/DockArrow";
import BackButton from "./Card/BackButton";
import ContentMenu from "./ContentMenu";

export default function DockMenu() {
  return (
    <Dock>
      <DockCard>
        <DockArrow type="left" />
      </DockCard>
      <DockDivider />
      {pages.map((page, index) => (
        <DockCard key={page.name}>
          <Card page={page} />
        </DockCard>
      ))}
      <DockDivider />
      <DockCard>
        <DockArrow type="right" />
      </DockCard>
      <BackButton />
      <ContentMenu />
    </Dock>
  );
}
