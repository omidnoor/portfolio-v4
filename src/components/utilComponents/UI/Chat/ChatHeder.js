import { useEffect, useState } from "react";
import ChatDots from "./ChatDots";
import styles from "./styles.module.scss";
import { BsRobot } from "react-icons/bs";
import { aboutmeContent } from "@/stores/aboutme";
import Image from "next/image";

const ChatHeder = () => {
  const [upload, setUpload] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) setUpload(true);
  }, []);

  const handleClick = async () => {
    if (count === 0) {
      setCount((count) => count + 1);
      const response = await fetch("/api/ai/contentUpload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aboutmeContent),
      });
    }
    if (upload && count > 0) {
      setUpload(false);
    }
  };

  return (
    <div className={styles.chatHeader}>
      <div className={styles.avatar}>
        {/* <BsRobot size={24} /> */}
        <Image src="/icons/robot-v1.jpg" width={40} height={40} alt="chatbot" />
      </div>
      <p>Memoai</p>
      {/* {upload && (
        <button
          style={{
            border: "none",
            backgroundColor: "#555",
            padding: "4px",
            color: "#fff",
            marginRight: "8px",
          }}
          onClick={handleClick}
        >
          Upload
        </button>
      )} */}
      {/* <ChatDots /> */}
    </div>
  );
};
export default ChatHeder;
