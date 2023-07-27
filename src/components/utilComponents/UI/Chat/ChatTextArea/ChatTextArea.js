import Message from "./Message";
import styles from "./styles.module.scss";

const ChatTextArea = () => {
  return (
    <div className={styles.textarea}>
      <Message>
        <p>Does he know about API endpoints?</p>
      </Message>
      <Message>
        <p>
          Omid is a junior ReactJS developer. Also he is experienced in 3d web
          development using ThreeJS Fiber
        </p>
      </Message>
      <Message>
        <p>tell me about Omid</p>
      </Message>
      <Message>
        <h2>Comming Soon</h2>
      </Message>
    </div>
  );
};
export default ChatTextArea;
