import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./home.module.scss";
import MagicWriter from "@/components/utilComponents/MagicWriter";
import ButtonUI from "@/components/utilComponents/UI/Button";
import Link from "next/link";
import { useSpring, animated, config } from "react-spring";
import { useAnimatedScaleOnHover } from "@/components/utilComponents/Animations/useAnimatedScaleOnHover ";
import { useStore } from "@/stores/store";
import Actions from "./Actions";

export default function HomeCard() {
  const { props, handleEnterLink, handleLeaveLink } = useAnimatedScaleOnHover();

  return (
    <div className={styles.container}>
      <div className={styles.HomeCard}>
        <div className={styles.HomeCard__intro}>
          <h1>
            Hi, my name is &nbsp;<span>Omid</span>
          </h1>
          <br />
          {/* <br /> */}
          {/* <h1>I am a</h1> */}
          {/* <br /> */}
          <div className={styles.HomeCard__intro__skills}>
            <MagicWriter
              texts={[
                "Full-Stack Web App",
                "ReactJS / NextJS",
                // "Web Application",
                // "AWS Architecture",
                "3D/2D Web",
                // "Front-End",
                // "Back-End",
              ]}
            />
          </div>
          <br />
          {/* <br /> */}
          {/* <p> front end and backend operations</p> */}
          <h1>Freelance Developer & Designer</h1>
        </div>
        {/* <hr /> */}

        {/* <br /> */}
        {/* <div className={styles.HomeCard__wrapper}>
        <animated.div
          className={styles.HomeCard__wrapper__socials}
          onMouseLeave={() => handleLeaveLink(0)}
          onMouseEnter={() => handleEnterLink(0)}
          style={{
            transform: props[0].scale?.to((s) => `scale(${s})`),
          }}
        >
          <Link href="https://github.com/omidnoor" target="_blank">
            <FaGithub />
          </Link>
        </animated.div>
        <animated.div
          className={styles.HomeCard__wrapper__socials}
          onMouseLeave={() => handleLeaveLink(1)}
          onMouseEnter={() => handleEnterLink(1)}
          style={{
            transform: props[1].scale?.to((s) => `scale(${s})`),
          }}
        >
          <Link
            href="https://www.linkedin.com/in/omidnoorshams/"
            target="_blank"
          >
            <FaLinkedin />
          </Link>
        </animated.div>
      </div> */}
      </div>
      {/* <div className={styles.letsTalk}>
        <div className={styles.letsTalk__title}>
          <h2>Services:</h2>
        </div>
        <div className={styles.letsTalk__content}>
          <ul className={styles.letsTalk__content__text}>
            <li>Full-stack Web Development</li>
            <li>Advanced Search Engine Solutions</li>
            <li>Document Interaction Bots</li>
            <li>Interactive QA Systems</li>
            <li>Chatbots using LLM</li>
            <li>Immersive 3D Web Experience (Like this portfolio)</li>
          </ul>
        </div>
      </div> */}
      {/* <div className={styles.actions}>
        <ButtonUI type="primary">let&apos;s talk</ButtonUI>
        <Link href="/files/Omid_Noorshams_Web_Dev_Resume.pdf" target="_blank">
          <ButtonUI type="secondary">Resume</ButtonUI>
        </Link>
      </div> */}
      {/* <Actions /> */}
    </div>
  );
}
