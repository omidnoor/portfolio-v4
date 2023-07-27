import { TextareaAutosize } from "@mui/material";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect, useState } from "react";

const ChatUserTextArea = () => {
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages({ role: "user", content: currentMessage });
    const response = await fetch("/api/ai/chatBot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: uuid(),
        role: "user",
        content: currentMessage,
      }),
    });
    setCurrentMessage("");
  };

  return (
    <div className={styles.userTextarea}>
      <form onSubmit={handleSubmit} className={styles.userTextarea__form}>
        <TextareaAutosize
          className={styles.userTextarea__textarea}
          maxRows={4}
          aria-label="maximum height"
          placeholder="Ask a question from chat bot..."
          defaultValue=""
          value={currentMessage}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatUserTextArea;
