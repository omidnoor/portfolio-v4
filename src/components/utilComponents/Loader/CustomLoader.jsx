import { Html, Loader, useProgress } from "@react-three/drei";
import styles from "./styles.module.scss";

const containerStyles = {
  backgroundColor: "aqua",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
};
const barStyles = {
  height: "20px",
  width: "50%",
  color: "#f8ff5f",
};
const dataStyles = {
  color: "#fd1025",
  fontSize: "20px",
  textAlign: "center",
};

const CustomLoader = () => {
  return (
    <Loader
      containerStyles={containerStyles}
      barStyles={barStyles}
      dataStyles={dataStyles}
      dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      initialState={(active) => active}
    />
  );
};

export default CustomLoader;
