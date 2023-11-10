import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <GridLoader
      height="32"
      width="32"
      color="#ffe000"
      ariaLabel="grid-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
export default Loader;
