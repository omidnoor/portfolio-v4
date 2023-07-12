import styles from "./styles.module.scss";
import { useFormik } from "formik";
import { Button } from "@mui/material";

const ContactForm = ({ setHtmlClicked = true }) => {
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          className={styles.input}
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your name"
          type="text"
          name="name"
          id="name"
        />
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          className={styles.input}
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email"
          type="email"
          name="email"
          id="email"
        />
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          className={styles.textarea}
          value={values.message}
          placeholder="Enter your message"
          onChange={handleChange}
          name="message"
          id="message"
          maxLength="500"
          cols={500}
          rows={15}
        />
        <div className={styles.button}>
          <Button
            variant="contained"
            color="primary"
            className={`${styles.btn} ${styles.btnContained}`}
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ContactForm;
