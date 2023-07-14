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

  useEffect(() => {
    // if
  }, [isLoading]);

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={contactFormSchema}
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          setMsg("");
          const res = await fetch(`/api/contact`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          setIsLoading(false);
          resetForm();
          setMsg("Message sent successfully!");
          return res.json();
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
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
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
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
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
              <ErrorMessage
                name="message"
                component="div"
                className={styles.error}
              />
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
            <div className={styles.msg}>{msg}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ContactForm;
