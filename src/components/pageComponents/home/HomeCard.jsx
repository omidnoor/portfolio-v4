import styles from "./home.module.scss";
import MagicWriter from "@/components/utilComponents/MagicWriter";
import { memo } from "react";

const HomeCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.HomeCard}>
        <div className={styles.HomeCard__intro}>
          <h1>
            Hi, my name is &nbsp;<span>Omid</span>
          </h1>
          <br />
          <div className={styles.HomeCard__intro__skills}>
            <MagicWriter
              texts={[
                "Generative AI",
                "Full-Stack Web App",
                "ReactJS / NextJS",
                "3D/2D Web",
              ]}
            />
          </div>
          <br />
          <h1>Freelance Developer & Designer</h1>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeCard);
