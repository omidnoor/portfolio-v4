import { Loader } from "@react-three/drei";

const containerStyles = {
  backgroundImage: `url("/textures/bg-gradients-v1.jpg")`,
  backgroundImageSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  margin: "0",
  padding: "0",
  justifyContent: "center",
  alignItems: "center",
};
const barStyles = {
  height: "20px",
  width: "50%",
  color: "#f8ff5f",
};
const dataStyles = {
  color: "#fff",
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
