import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

const AboutMeContent = () => {
  const [page, setPage] = useState(0);

  const arrowCount = useStore((state) => state.arrowCount);

  useEffect(() => {
    setPage(Math.abs(arrowCount % 3));
  }, [arrowCount]);

  return (
    <div onClick={(e) => e.stopPropagation(e)} className={styles.container}>
      <div className={styles.title}>
        <h1>Explore my journey in web development</h1>
      </div>
      <div className={styles.subTitle}>
        <h2>
          A dedicated Web Developer with a deep passion for ReactJS, interactive
          design, and cutting-edge web technologies.
        </h2>
      </div>
      {page === 0 ? (
        <>
          <div className={styles.description}>
            <p>
              My journey in web development has been fueled by a desire to
              create engaging, efficient, and accessible digital experiences.
              With a strong focus on ReactJS, NextJS and JavaScript, I have a
              solid grasp of modern front-end development, CSS, HTML, and a keen
              understanding of data structures and algorithms.
            </p>
            <p>
              Beyond conventional frameworks, I am particularly fascinated with
              3D web development using WebGL and ThreeJS. I firmly believe that
              this emerging field will revolutionize the way we interact with
              the digital world, bringing a new level of depth and immersion to
              user experiences.
            </p>
          </div>
        </>
      ) : page === 1 ? (
        <>
          <div className={styles.description}>
            <p>
              As evidence, look no further than this virtual gallery you are
              navigating - a portfolio I&apos;ve developed using
              react-three-fiber, where you can engage with my projects in a
              metaverse-like experience. This challenging project not only
              underscores my technical capabilities but also exemplifies my
              innovative approach to web development.
            </p>
            <p>
              From prototyping to deployment, I approach every project with a
              meticulous attention to detail, keen problem-solving skills, and
              an eagerness to embrace new challenges.
            </p>
          </div>
        </>
      ) : page === 2 ? (
        <>
          <div className={styles.description}>
            <p>
              Diverse disciplines, including Mechanical Engineering and
              Neuroscience, where I&apos;ve earned Master&apos;s degrees,
              contribute to my unique background. They&apos;ve honed my
              analytical thinking and fostered an appreciation for the intricate
              mechanisms that underpin both machines and the human mind, skills
              that I find incredibly useful in the realm of web development.
            </p>
            <p>
              I envision a future where technology and creativity converge in
              unexpected ways, offering unprecedented interactivity and
              engagement on the web. As I continue to explore and contribute to
              this vibrant field, I am thrilled to be part of the journey that
              shapes this future.
            </p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default AboutMeContent;
