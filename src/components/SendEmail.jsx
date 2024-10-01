import emailjs from "emailjs-com";
import { useState } from "react";
import styles from "./SendEmail.module.css";

const SendEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: email,
      message: message,
    };

    emailjs
      .send(
        "service_skeuhac",
        "template_50p8xpd",
        templateParams,
        "nvV1X0m5tKa9Fx2hh"
      )
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
        setEmail("");
        setMessage("");
      });

    setEmail("");
    setMessage("");
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.header}>Send Your Email</h1>
      <form onSubmit={sendEmail} className={styles.form}>
        <label className={styles.inputLabel}>Enter Your Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <label className={styles.inputLabel}>Write your message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendEmail;
