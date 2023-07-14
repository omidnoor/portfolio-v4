import { Html, useProgress } from "@react-three/drei";
import styles from "./styles.module.scss";

const CustomLoader = () => {
  const { active, progress, errors, item, loader, total } = useProgress();
  // console.log(
  //   "Progress:",
  //   progress,
  //   "Active:",
  //   active,
  //   "Errors:",
  //   errors,
  //   "Item:",
  //   item,
  //   "Loader:",
  //   loader,
  //   "Total:",
  //   total,
  // );

  return (
    <Html>
      <div className={styles.container}>
        <h1>Loading...</h1>
        {/* <h3>{`item: ${item}`}</h3>
        <h3>{`loader: ${loader}`}</h3> */}
        {active && (
          <div
            style={{
              width: "100%",
              height: "5px",
              background: "#ccc",
              position: "absolute",
              top: "0",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "5px",
                background: "#4caf50",
              }}
            ></div>
          </div>
        )}
      </div>
    </Html>
  );
};
export default CustomLoader;
