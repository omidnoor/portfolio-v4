import { TextareaAutosize } from "@mui/material";
import styles from "./styles.module.scss";
import { useStore } from "@/stores/store";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const ChatUserTextArea = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { setIsChatLoading, setMessages, question, setQuestion, messages } =
    useStore();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  useEffect(() => {
    const submitQuestion = async () => {
      if (question) {
        await handleSubmit();
      }
    };
    submitQuestion();
    setQuestion("");
  }, [currentMessage, question]);

  // useEffect(() => {
  //   if (question) {
  //     setCurrentMessage(question);
  //   }
  // }, [question]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsChatLoading(true);
    setMessages({ role: "user", content: question || currentMessage });
    setCurrentMessage("");
    try {
      // const response = await fetch("/api/ai/chatBot", {
      const response = await fetch(
        "https://ifr8ws9p16.execute-api.us-west-1.amazonaws.com/dev/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: uuid(),
            role: "user",
            content: question || currentMessage,
          }),
        },
      );

      // if (!response.ok) {
      if (!response.ok) {
        // If the response status is not OK, throw an error
        setError("Failed to send message. Please try again.");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const body = JSON.parse(data.body);
      // console.log(JSON.parse(data.body));
      // setMessages({ role: "assistant", content: data.content });
      setMessages({ role: "assistant", content: body.content });
    } catch (error) {
      // Handle the error here
      setError("Failed to send message. Please try again.");
      console.error("Error submitting message:", error);
      // Optionally, update the UI to show an error message to the user
      // setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setCurrentMessage("");
      setError("");
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[0];
      // console.log(`Last message: ${lastMessage.content}`);
      if (lastMessage.content.trim() === "") {
        return;
      }
      console.log(lastMessage);
      const storeChat = async () => {
        try {
          // console.log(`Storing chat message: ${lastMessage.content}`);
          const response = await fetch("/api/ai/storeChat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: uuid(),
              role: lastMessage.role,
              content: lastMessage.content,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Handle the response if needed
          const data = await response.json();
          // console.log(data); // or handle data as needed
        } catch (error) {
          console.error("Failed to store message:", error);
        }
      };
      storeChat();
    }
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.userTextarea}>
      {error && <p className={styles.userTextarea__error}>{error}</p>}
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
        <button type="submit">
          <i className="fa fa-paper-plane" style={{ color: "#a90ff6" }}></i>
        </button>
      </form>
    </div>
  );
};
export default ChatUserTextArea;
