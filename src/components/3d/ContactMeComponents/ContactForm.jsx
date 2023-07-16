import styles from "./styles.module.scss";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const contactFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string()
    .required("Message is required")
    .min(2, "Message must be at least 2 characters")
    .max(500, "Message must be at most 500 characters"),
});

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (msg) {
      const msgTimeout = setTimeout(() => setMsg(""), 3000);
      return () => clearTimeout(msgTimeout);
    }
    if (error) {
      const errorTimeout = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(errorTimeout);
    }
  }, [isLoading]);

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={contactFormSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            setIsLoading(true);
            setMsg("");
            const res = await fetch(`/api/contact`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(values),
            });

            if (!res.ok) {
              throw new Error("Something went wrong. Please try again later.");
            }

            const jsonData = await res.json();

            setIsLoading(false);
            resetForm();
            setMsg("Message sent successfully!");
            setError("");

            return jsonData;
          } catch (error) {
            setIsLoading(false);
            setError(error.message);
          }
        }}
      >
        {() => (
          <Form autoComplete="off" className={styles.form}>
            <div className={styles.inputBlock}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <Field
                className={styles.input}
                placeholder="Enter your name"
                type="text"
                name="name"
                id="name"
              />
              <div className={styles.error}>
                <ErrorMessage name="name" component="div" />
              </div>
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <Field
                className={styles.input}
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email"
              />
              <div className={styles.error}>
                <ErrorMessage name="email" component="div" />
              </div>
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <Field
                as="textarea"
                className={styles.textarea}
                placeholder="Enter your message"
                name="message"
                id="message"
                maxLength="500"
                cols={500}
                rows={15}
              />
              <div className={styles.error}>
                <ErrorMessage name="message" component="div" />
              </div>
            </div>

            <div className={styles.button}>
              <Button
                variant="contained"
                color="primary"
                className={`${styles.btn} ${styles.btnContained}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <div>Sending...</div> : `Send`}
              </Button>
            </div>
            <div
              style={{ color: error ? "#f00" : "#00f" }}
              className={styles.msg}
            >
              {msg.length > 0 && msg}
              {error.length > 0 && error}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ContactForm;
