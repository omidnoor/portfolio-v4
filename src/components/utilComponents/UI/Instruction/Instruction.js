import styles from "./styles.module.scss";

const Instruction = () => {
  return (
    <div className={styles.instruction}>
      <p>Navigate gallery via menu below.</p>
      <p>
        Query{" "}
        <span style={{ color: "#bda036", fontWeight: "900" }}>Chatbot</span> for
        info about me.
      </p>
    </div>
  );
};
export default Instruction;
