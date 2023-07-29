import { TextareaAutosize } from "@mui/material";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Loader from "@/components/utilComponents/Loader/Loader";

const ChatUserTextArea = () => {
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  const [currentMessage, setCurrentMessage] = useState("");
  const setIsChatLoading = useStore((state) => state.setIsChatLoading);

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChatLoading(true);
    setMessages({ role: "user", content: currentMessage });
    setCurrentMessage("");
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
    const data = await response.json();
    setMessages({ role: "assistant", content: data.content });

    setIsChatLoading(false);
  };

  return (
    <div className={styles.userTextarea}>
      <form onSubmit={handleSubmit} className={styles.userTextarea__form}>
        <TextareaAutosize
          className={styles.userTextarea__textarea}
          maxRows={4}
          aria-label="maximum height"
          placeholder="Ask a question from chat bot..."
          value={currentMessage}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatUserTextArea;
