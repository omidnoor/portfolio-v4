import { useState } from "react";
import styles from "../styles/chatbot.module.scss";
import { Button, Input } from "@mui/material";

const chatbot = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const createIndexAndEmbeddings = async () => {
    try {
      console.log(`createIndexAndEmbeddings`);
      const result = await fetch(`/api/ai/setup`, {
        method: "POST",
      });
      console.log(`result: ${result}`);
      //   const data = await result.json();
      //   console.log(`data: ${data}`);
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  const sendQuery = async () => {
    if (query.trim() === "") return;
    setLoading(true);
    setResult("");
    console.log(`sendQuery ${query.trim()}`);
    try {
      const result = await fetch(`/api/ai/read`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      console.log(`result: ${result}`);
      const json = await result.json();
      setResult(json.data);
      console.log(`result: ${json.data}`);
    } catch (error) {
      console.log(`error ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.embedding}>
        <Button
          disabled={loading}
          variant="outlined"
          color="secondary"
          onClick={createIndexAndEmbeddings}
        >
          Create index and embedding
        </Button>
      </div>
      <Input onChange={(e) => setQuery(e.target.value)} />
      <Button
        onClick={sendQuery}
        variant="contained"
        color="primary"
        disabled={loading}
        loading={loading}
      >
        Ask AI
      </Button>
      {loading && (
        <div className={styles.loading}>
          <p>Asking AI...</p>
        </div>
      )}

      <div className={styles.result}>{result && <p>{result}</p>}</div>
    </div>
  );
};
export default chatbot;
