import { Html } from "@react-three/drei";
import { pages } from "@/stores/data";
import { useStore } from "@/stores/store";
import { memo, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";

const PlateContent = () => {
  const [activeSub, setActiveSub] = useState(null);

  const {
    activeMenuButton,
    arrowCount,
    setPlateClicked,
    setHtmlClicked,
    isSceneClicked,
    setDollyCount,
    setLastClick,
  } = useStore((state) => state);

  const active = pages.find((page) => page.name === activeMenuButton);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      setPlateClicked(true);
      setHtmlClicked(false);
      setDollyCount(1);
      setLastClick("plate");
    },
    [setPlateClicked, setHtmlClicked, setDollyCount, setLastClick],
  );

  const handleEnter = useCallback((e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  }, []);

  const handleLeave = useCallback((e) => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
  }, []);

  useEffect(() => {
    setPlateClicked(false);
    setDollyCount(0);
  }, [isSceneClicked, activeMenuButton, arrowCount]);

  useEffect(() => {
    if (active?.sub) {
      setActiveSub(active.sub[Math.abs(arrowCount % active.sub.length)]);
    } else {
      setActiveSub(null);
    }
  }, [activeMenuButton, active, arrowCount]);
  console.log(activeSub);
  return (
    <Html
      zIndexRange={[0, 0]}
      position={[0, 0, 0.1]}
      wrapperClass={styles.wrapper}
      transform
      occlude
    >
      <div
        className={styles.container}
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {!!activeSub && (
          <>
            <div className={styles.name}>
              <p>Name: </p>
              <h3>
                {active?.sub &&
                  active?.sub[Math.abs(arrowCount % active.sub.length)]?.plate
                    ?.title}
              </h3>
            </div>
            {active?.sub &&
              active?.sub[Math.abs(arrowCount % active.sub.length)]?.plate
                ?.frameWorks && (
                <div className={styles.lib}>
                  <p>Frameworks / Libraries:</p>
                  <ul>
                    {active?.sub[
                      Math.abs(arrowCount % active.sub.length)
                    ]?.plate?.frameWorks?.map((frame, index) => (
                      <li key={index}> {frame}</li>
                    ))}
                  </ul>
                </div>
              )}
            <div className={styles.description}>
              <p>Description: </p>
              <ul>
                {active?.sub &&
                  active?.sub[
                    Math.abs(arrowCount % active.sub.length)
                  ]?.plate?.description?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </div>
            <div className={styles.links}>
              <Link
                href={
                  (active?.sub &&
                    active?.sub[Math.abs(arrowCount % active.sub.length)]?.plate
                      ?.deployUrl) ||
                  `/`
                }
              >
                <FaLink />
              </Link>
              <Link
                href={
                  (active?.sub &&
                    active?.sub[Math.abs(arrowCount % active.sub.length)]?.plate
                      ?.deployUrl) ||
                  `/`
                }
              >
                <FaGithub />
              </Link>
            </div>
          </>
        )}
      </div>
    </Html>
  );
};
export default memo(PlateContent);
