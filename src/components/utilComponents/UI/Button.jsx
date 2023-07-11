import { Button } from "@mui/material";

import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";

export default function ButtonUI({ children, type }) {
  const setIsLetsTalk = useStore((state) => state.setIsLetsTalk);

  const hanldeClick = (e) => {
    e.stopPropagation();
    if (type === "primary") {
      setIsLetsTalk(true);
    } else {
      setIsLetsTalk(false);
    }
  };

  return (
    <div onClick={hanldeClick}>
      {type === "primary" ? (
        <Button
          variant="contained"
          color="primary"
          className={`${styles.btn} ${styles.btnContained}`}
        >
          {children}
        </Button>
      ) : type === "secondary" ? (
        <Button
          variant="outlined"
          color="primary"
          className={`${styles.btnOutlined} ${styles.btn} `}
        >
          {children}
        </Button>
      ) : (
        ""
      )}
      {/* <Button /> */}
    </div>
  );
}
