import { useWindowWidth } from "@/components/3d/Utils/useWindowWidth";
import styles from "./services.module.scss";

import {
  FaCode,
  FaCube,
  FaDatabase,
  FaRobot,
  FaBrain,
  FaPencilAlt,
  FaSearch,
} from "react-icons/fa";

const icons = {
  FaCode,
  FaCube,
  FaDatabase,
  FaRobot,
  FaBrain,
  FaPencilAlt,
  FaSearch,
};

const Item = ({ description, title, subtitle, icon, index }) => {
  const IconComponent = icons[icon];

  const width = useWindowWidth();
  // console.log(width);
  let itemStyles = {};
  if (width < 500) {
    itemStyles = {
      position: "absolute",
    };
    // itemStyles.left = `${index * 1000}px`;
    // itemStyles.width = `${100}px`;
  }

  return (
    <div className={styles.item} style={itemStyles}>
      <div className={styles.item__container}>
        <div className={styles.item__container__icon}>
          {IconComponent && <IconComponent size={width < 500 ? 200 : 100} />}
        </div>
        <div className={styles.item__container__title}>
          <h3>{title}</h3>
        </div>
        {/* <div className={styles.item__container__subtitle}>
          <h4>{subtitle}</h4>
        </div> */}
        <div className={styles.item__container__description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
export default Item;
