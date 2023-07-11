import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./home.module.scss";
import MagicWriter from "@/components/utilComponents/MagicWriter";
import ButtonUI from "@/components/utilComponents/UI/Button";
import Link from "next/link";
import { useSprings, animated } from "react-spring";
import { useAnimatedScaleOnHover } from "@/components/utilComponents/Animations/useAnimatedScaleOnHover ";

export default function HomeCard() {
  const [props, api] = useSprings(2, () => ({
    from: { scale: 1 },
    config: {
      mass: 1,
      tension: 100,
      friction: 5,
    },
  }));

  const handleEnterGithub = (e) => {
    e.stopPropagation();
    api.start((i) => (i === 0 ? { scale: 1.2 } : {}));
  };

  const handleLeaveGithub = (e) => {
    e.stopPropagation();
    api.start((i) => (i === 0 ? { scale: 1 } : {}));
  };

  const handleEnterLink = (e) => {
    e.stopPropagation();
    api.start((i) => (i === 1 ? { scale: 1.2 } : {}));
  };

  const handleLeaveLink = (e) => {
    e.stopPropagation();
    api.start((i) => (i === 1 ? { scale: 1 } : {}));
  };

  // const { props, handleEnterLink, handleLeaveLink } = useAnimatedScaleOnHover();
  // console.log(props[1].scale);
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
        <h2>Developer & Desinger</h2>
      </div>
      <div className={styles.HomeCard__actions}>
        <ButtonUI type="primary">let's talk</ButtonUI>
        <ButtonUI type="secondary">Resume</ButtonUI>
      </div>
      <br />
      <div className={styles.HomeCard__wrapper}>
        <animated.div
          className={styles.HomeCard__wrapper__socials}
          onMouseLeave={handleLeaveGithub}
          onMouseEnter={handleEnterGithub}
          style={{
            transform: props[0].scale?.to((s) => `scale(${s})`),
          }}
        >
          <Link href="https://github.com/omidnoor">
            <FaGithub />
          </Link>
        </animated.div>
        <animated.div
          className={styles.HomeCard__wrapper__socials}
          onMouseLeave={handleLeaveLink}
          onMouseEnter={handleEnterLink}
          style={{
            transform: props[1].scale?.to((s) => `scale(${s})`),
          }}
        >
          <Link href="https://www.aedin.com/in/omidnoorshams/" target="_blank">
            <FaLinkedin />
          </Link>
        </animated.div>
      </div>
    </div>
  );
}
