import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";
import { useEffect } from "react";

const AboutMeContent = () => {
  const setIsReadMoreOne = useStore((state) => state.setIsReadMoreOne);
  const isReadMoreOne = useStore((state) => state.isReadMoreOne);
  const setIsReadMoreTwo = useStore((state) => state.setIsReadMoreTwo);
  const isReadMoreTwo = useStore((state) => state.isReadMoreTwo);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const setIsReadBack = useStore((state) => state.setIsReadBack);
  const isReadBack = useStore((state) => state.isReadBack);
  const htmlClicked = useStore((state) => state.htmlClicked);

  const handleClickOne = (e) => {
    e.stopPropagation();
    setIsReadMoreOne(true);
    setIsReadMoreTwo(false);
    setIsReadBack(false);
  };

  const handleClickTwo = (e) => {
    e.stopPropagation();
    setIsReadMoreTwo(true);
    setIsReadBack(false);
  };

  const handleClickBack = (e) => {
    e.stopPropagation();
    setIsReadBack(true);
    if (isReadMoreTwo) {
      setIsReadMoreTwo(false);
    } else if (isReadMoreOne) {
      setIsReadMoreOne(false);
    }
  };

  useEffect(() => {
    if (isSceneClicked || htmlClicked) {
      setIsReadMoreOne(false);
      setIsReadMoreTwo(false);
      setIsReadBack(false);
    }
  }, [isSceneClicked, htmlClicked]);

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
      {!isReadMoreOne ? (
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
              <span>
                <button onClick={handleClickOne}>&nbsp; Read more...</button>
              </span>
            </p>
          </div>
        </>
      ) : !isReadMoreTwo ? (
        <>
          <div className={styles.description}>
            <p>
              As evidence, look no further than this virtual gallery you are
              navigating - a portfolio I've developed using react-three-fiber,
              where you can engage with my projects in a metaverse-like
              experience. This challenging project not only underscores my
              technical capabilities but also exemplifies my innovative approach
              to web development.
            </p>
            <p>
              From prototyping to deployment, I approach every project with a
              meticulous attention to detail, keen problem-solving skills, and
              an eagerness to embrace new challenges.
              <span>
                <button onClick={handleClickTwo}>&nbsp; Read more...</button>
              </span>
            </p>
          </div>
          <div className={styles.back}>
            <button onClick={handleClickBack}>&larr;Back.</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.description}>
            <p>
              Diverse disciplines, including Mechanical Engineering and
              Neuroscience, where I've earned Master's degrees, contribute to my
              unique background. They've honed my analytical thinking and
              fostered an appreciation for the intricate mechanisms that
              underpin both machines and the human mind, skills that I find
              incredibly useful in the realm of web development.
            </p>
            <p>
              I envision a future where technology and creativity converge in
              unexpected ways, offering unprecedented interactivity and
              engagement on the web. As I continue to explore and contribute to
              this vibrant field, I am thrilled to be part of the journey that
              shapes this future.
            </p>
          </div>
          <div className={styles.back}>
            <button onClick={handleClickBack}> &larr;Back.</button>
          </div>
        </>
      )}
    </div>
  );
};
export default AboutMeContent;
