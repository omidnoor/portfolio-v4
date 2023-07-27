import { TextareaAutosize } from "@mui/material";
import styles from "./styles.module.scss";

const ChatUserTextArea = () => {
  return (
    <div className={styles.userTextarea}>
      <TextareaAutosize
        className={styles.userTextarea__textarea}
        maxRows={4}
        aria-label="maximum height"
        placeholder="Ask a question from chat bot..."
        defaultValue=""
      />
    </div>
  );
};
export default ChatUserTextArea;
