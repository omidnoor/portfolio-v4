import { useStore } from "@/stores/store";
import Card from "./Card/Card";
import { Dock } from "./Dock/Dock";
import { DockCard } from "./DockCard/DockCard";
import { DockDivider } from "./DockDivider/DockDivider";
import { pages } from "@/stores/data";

export default function DockMenu() {
  const activeMenuButton = useStore((state) => state.activeMenuButton);

  return (
    <Dock>
      {pages.map((page, index) =>
        page.url ? (
          <DockCard key={page.name}>
            <Card page={page} />
          </DockCard>
        ) : (
          <DockDivider key={index} />
        ),
      )}
    </Dock>
  );
}
