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
  // marginLeft: "-50%",
  height: "20px",
  width: "100%",
  color: "#f8ff5f",
  backgroundColor: "#200000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const dataStyles = {
  color: "#fff",
  fontSize: "20px",
  fontweight: "bold",
  textAlign: "center",
};

const inner = {
  //   marginLeft: "-50%",
  //   // height: "100%",
  //   width: "200%",
  // backgroundColor: "#200000",
  // color: "#f00",
};

const CustomLoader = () => {
  return (
    <Loader
      containerStyles={containerStyles}
      barStyles={barStyles}
      innerStyles={inner}
      dataStyles={dataStyles}
      dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      initialState={(active) => active}
    />
  );
};

export default CustomLoader;
