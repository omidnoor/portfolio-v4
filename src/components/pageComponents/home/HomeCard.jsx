import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./home.module.scss";
import MagicWriter from "@/components/utilComponents/MagicWriter";
import ButtonUI from "@/components/utilComponents/UI/Button";
import Link from "next/link";
import { useSprings, animated } from "react-spring";
import { useAnimatedScaleOnHover } from "@/components/utilComponents/Animations/useAnimatedScaleOnHover ";

export default function HomeCard() {
  const { props, handleEnterLink, handleLeaveLink } = useAnimatedScaleOnHover();

  return (
    <div className={styles.HomeCard}>
      <div className={styles.HomeCard__intro}>
        <h3>
          Hi, my name is &nbsp;<span>Omid</span>
        </h3>
        <br />
        <br />
        <h3>I am a</h3>
        <br />
        <div className={styles.HomeCard__intro__skills}>
          <h1>
            <MagicWriter
              texts={[
                "ReactJS / NextJS",
                "Ecommerce Web",
                "3D/2D Web",
                "Front-End",
                "Back-End",
              ]}
            />
          </h1>
        </div>
        {/* <p> front end and backend operations</p> */}
        <h2>Developer & Designer</h2>
      </div>
      <div className={styles.HomeCard__actions}>
        <ButtonUI type="primary">let&apos;s talk</ButtonUI>
        <Link href="/files/Omid_Noorshams_Web_Dev_Resume.pdf" target="_blank">
          <ButtonUI type="secondary">Resume</ButtonUI>
        </Link>
      </div>
      <br />
      <div className={styles.HomeCard__wrapper}>
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
      </div>
    </div>
  );
}
