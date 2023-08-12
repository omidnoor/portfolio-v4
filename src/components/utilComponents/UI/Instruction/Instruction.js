import styles from "./styles.module.scss";

const Instruction = () => {
  return (
    <div className={styles.instruction}>
      <p
        style={{
          borderBottom: "1px solid #000",
          width: "100%",
          paddingBottom: "12px",
        }}
      >
        Welcome to my gallery
      </p>
      <br />
      <p>Navigate via menu below.</p>
      <p>
        Query
        <span style={{ color: "#bda036", fontWeight: "900" }}>
          {" "}
          Chatbot
        </span>{" "}
        for more info.
      </p>
    </div>
  );
};
export default Instruction;
