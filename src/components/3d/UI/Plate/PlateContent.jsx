import { Html } from "@react-three/drei";
import { pages } from "@/stores/data";
import { useStore } from "@/stores/store";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";

let activeSub;

const PlateContent = () => {
  const activeMenuButton = useStore((state) => state.activeMenuButton);
  const activeFrame = useStore((state) => state.activeFrame);
  const arrowCount = useStore((state) => state.arrowCount);
  const active = pages.find((page) => page.name === activeMenuButton);
  useEffect(() => {
    if (active?.sub) {
      const activeSub = active.sub[arrowCount];
    }
  }, [activeMenuButton]);

  const handleClick = (e) => {
    e.stopPropagation();
  };
  console.log(active?.sub[arrowCount]?.plate?.deployUrl);
  return (
    <Html
      position={[0, 0, 0.1]}
      wrapperClass={styles.wrapper}
      transform
      occlude
    >
      <div className={styles.container} onClick={handleClick}>
        <div className={styles.name}>
          <p>Name: </p>
          <h3>{active?.sub[arrowCount]?.plate.title}</h3>
        </div>

        <div className={styles.lib}>
          <p>Frameworks / Libraries:</p>
          <ul>
            {active?.sub[arrowCount]?.plate?.frameWorks?.map((frame, index) => (
              <li key={index}> &ndash; {frame}</li>
            ))}
          </ul>
        </div>
        <div className={styles.description}>
          <p>Description: </p>
          <ul>
            {active?.sub[arrowCount]?.plate?.description.map((item, index) => (
              <li key={index}>&ndash; {item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.links}>
          <Link href={active?.sub[arrowCount]?.plate?.deployUrl || `/`}>
            <FaLink />
          </Link>
          <Link href={active?.sub[arrowCount]?.plate?.deployUrl || `/`}>
            <FaGithub />
          </Link>
        </div>
      </div>
    </Html>
  );
};
export default PlateContent;
