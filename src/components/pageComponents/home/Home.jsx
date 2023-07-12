import styles from "./home.module.scss";
import HomeCard from "../home/HomeCard";
import HomeImage from "../home/HomeImage";
import { memo } from "react";

const Home = () => {
  return (
    <div className={`${styles.homeSection}`}>
      <HomeImage />
      <HomeCard />
    </div>
  );
};
export default memo(Home);
