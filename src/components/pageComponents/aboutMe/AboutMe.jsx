import { a } from "@react-spring/web";
import { useSpring } from "react-spring";
import Services from "./Services";
import styles from "./aboutme.module.scss";

const colors = {
  background: "#ffffff00",
  fill: "#ffffff",
  wordColors: {
    tech: "#2dbbf0",
    education: "#02ff10",
    general: "#006239",
  },
};

const AboutMe = ({ style }) => {
  const [{ background, fill, wordColor }, set] = useSpring(
    {
      background: colors.background,
      fill: colors.fill,
      wordColor: colors.wordColors,
    },
    [],
  );

  return (
    <a.div className={styles.container}>
      <Services />
    </a.div>
  );
};
export default AboutMe;
