import { useStore } from "@/stores/store";
import styles from "./styles.module.scss";

const questions = [
  "What are Omid's key skills and areas of expertise?",
  "Can you tell me about his past projects?",
  "How can Omid utilize AI to enhance our digital solutions?",
];

const ExampleQuestions = () => {
  const { setQuestion } = useStore();

  const handleQuestion = (e) => {
    setQuestion(e.target.innerText);
  };
  return (
    <div className={styles.questionsContainer}>
      {questions.map((question, index) => (
        <div
          className={styles.question}
          key={index}
          on
          onClick={handleQuestion}
        >
          {question}
        </div>
      ))}
    </div>
  );
};
export default ExampleQuestions;
