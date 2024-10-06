import emailjs from "emailjs-com";
import { useEffect, useState } from "react";
import styles from "./AlarmEmail.module.css";

const AlarmEmail = () => {
  const [email, setEmail] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
      checkAlarmTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentDate, alarmTime]);

  const onEmailChange = (e) => setEmail(e.target.value);

  const onAlarmTimeChange = (e) => setAlarmTime(e.target.value);

  const checkAlarmTime = () => {
    if (alarmTime) {
      const currentTime = currentDate.toTimeString().slice(0, 5);

      if (currentTime === alarmTime) {
        sendEmail();
      }
    }
  };

  const sendEmail = (e) => {
    if (e) e.preventDefault();

    const templateParams = {
      to_email: email,
      message: `Your alarm for ${alarmTime} has been triggered.`,
    };

    emailjs
      .send(
        "service_skeuhac",
        "template_50p8xpd",
        templateParams,
        "nvV1X0m5tKa9Fx2hh"
      )
      .then(() => {
        console.log("Email sent successfully");
        setEmail("");
        setAlarmTime("");
      })
      .catch((error) => {
        console.log(error);
        setEmail("");
        setAlarmTime("");
      });
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form} onSubmit={sendEmail}>
        <label className={styles.inputLabel}>Enter Your Email</label>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={onEmailChange}
          required
          className={styles.input}
        />
        <input value={currentDate.toLocaleString()} disabled />
        <label className={styles.inputLabel}>Set Alarm Time</label>
        <input
          type="time"
          value={alarmTime}
          onChange={onAlarmTimeChange}
          required
        />
        <button className={styles.button} type="submit">
          Set your Alarm
        </button>
      </form>
    </div>
  );
};

export default AlarmEmail;
