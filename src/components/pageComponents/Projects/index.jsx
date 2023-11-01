import { useAnimatedScaleOnHover } from "@/components/utilComponents/Animations/useAnimatedScaleOnHover ";
import { useStore } from "@/stores/store";
import { useCallback, useEffect } from "react";
import { animated, useSprings } from "react-spring";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";
import styles from "./projects.module.scss";
import Image from "next/image";

const Projects = ({ plate, image }) => {
  const {
    activeMenuButton,
    arrowCount,
    setPlateClicked,
    setHtmlClicked,
    isSceneClicked,
    setLastClick,
  } = useStore((state) => state);

  const { props, handleEnterLink, handleLeaveLink } = useAnimatedScaleOnHover();

  //   const active = pages.find((page) => page.name === activeMenuButton);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setPlateClicked(true);
    setHtmlClicked(false);
    setLastClick("plate");
  }, []);

  const handleEnter = useCallback((e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  }, []);

  const handleLeave = useCallback((e) => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
  }, []);

  useEffect(() => {
    activeMenuButton !== "About Me" && setPlateClicked(false);
  }, [isSceneClicked, activeMenuButton, arrowCount]);

  return (
    <>
      {plate && (
        <div
          className={styles.container}
          onClick={handleClick}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className={styles.content}>
            <div className={styles.name}>
              <p>Name: </p>
              <h3>{plate.title}</h3>
            </div>
            {plate.frameWorks && (
              <div className={styles.lib}>
                <p>Frameworks / Libraries:</p>
                <ul>
                  {plate.frameWorks.map((frame, index) => (
                    <li key={index}> {frame}</li>
                  ))}
                </ul>
              </div>
            )}
            {plate.description && (
              <div className={styles.description}>
                <p>Description: </p>
                <ul>
                  {plate.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={styles.image}>
            <Image
              src={image}
              // style={{ objectFit: "contain" }}
              // fill={true}
              width={925}
              height={1250}
              alt="project content image"
            />
          </div>
          <div className={styles.links}>
            <animated.div
              onMouseLeave={() => handleLeaveLink(1)}
              onMouseEnter={() => handleEnterLink(1)}
              style={{
                transform: props[1].scale?.to((s) => `scale(${s})`),
              }}
            >
              <Link href={plate.deployUrl || `/`}>
                <FaLink />
              </Link>
            </animated.div>
            <animated.div
              onMouseLeave={() => handleLeaveLink(0)}
              onMouseEnter={() => handleEnterLink(0)}
              style={{
                transform: props[0].scale?.to((s) => `scale(${s})`),
              }}
            >
              <Link href={plate.githubUrl || `/`}>
                <FaGithub />
              </Link>
            </animated.div>
          </div>
        </div>
      )}
    </>
  );
};
export default Projects;
