import React, { useState } from "react";
import { motion } from "framer-motion";
import WelcomeTemplate from "../../templates/WelcomeTemplate/WelcomeTemplate";
import styles from "./SignUpPage.module.scss";
import axios from "axios";

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };

const SignUpPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "email") {
      setInputEmail(value);
    } else {
      setInputPassword(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: inputEmail,
      password: inputPassword,
    };
    console.log("działą", newUser);
    axios
      .post("http://localhost:4000/user/signup", newUser)
      .then((res) => {
        console.log(res);
        return axios.post("http://localhost:4000/user/login", newUser);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <WelcomeTemplate>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        className={styles.container}
        className={styles.wrapper}
      >
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Your email:</label>
            <input name="email" type="email" onChange={handleChange}></input>
          </div>
          <div>
            <label htmlFor="password">Your password:</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
            ></input>
          </div>
          <button type="submit">Sign up</button>
        </form>
      </motion.div>
    </WelcomeTemplate>
  );
};

export default SignUpPage;
