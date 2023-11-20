import { TextareaAutosize } from "@mui/material";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Loader from "@/components/utilComponents/Loader/Loader";

const ChatUserTextArea = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { setIsChatLoading, setMessages, question, setQuestion } = useStore();

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  useEffect(() => {
    const submitQuestion = async () => {
      if (question) {
        // console.log(`submitting question: ${question}`);
        setCurrentMessage(question);
        await handleSubmit(question);
        setQuestion("");
      }
    };
    submitQuestion();
  }, [question]);

  const handleSubmit = async (message = currentMessage, e) => {
    if (e) e.preventDefault();
    setIsChatLoading(true);
    setMessages({ role: "user", content: message });
    console.log(`submitting message: ${message}`);
    const response = await fetch("/api/ai/chatBot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: uuid(),
        role: "user",
        content: message,
      }),
    });
    const data = await response.json();
    setMessages({ role: "assistant", content: data.content });
    setCurrentMessage("");
    setIsChatLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
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
          onKeyDown={handleKeyDown}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatUserTextArea;
