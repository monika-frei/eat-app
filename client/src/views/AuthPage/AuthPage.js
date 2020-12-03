import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import WelcomeTemplate from "../../templates/WelcomeTemplate/WelcomeTemplate";
import Button from "../../components/atoms/Button/Button";
import styles from "./AuthPage.module.scss";
import { GlobalContext } from "../../context/GlobalContext";
import PageType from "../../providers/PageType";
import { Link, Redirect } from "react-router-dom";

const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

const AuthPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { handleSignUp, handleLogIn, userLoggedIn } = useContext(GlobalContext);

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "email") {
      setInputEmail(value);
    } else {
      setInputPassword(value);
    }
  };
  return (
    <PageType
      render={(type) => (
        <WelcomeTemplate>
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className={styles.container}
          >
            <h1 className={styles.formTitle}>
              {type === "signup" && "Sign up!"}
              {type === "login" && "Log in"}
            </h1>
            <form
              className={styles.formWrapper}
              onSubmit={(e) => {
                type === "signup" && handleSignUp(e, inputEmail, inputPassword);
                type === "login" && handleLogIn(e, inputEmail, inputPassword);
              }}
            >
              <div className={styles.formWrapper}>
                <label className={styles.label} htmlFor="email">
                  Your email:
                </label>
                <input
                  name="email"
                  type="email"
                  className={styles.input}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <label className={styles.label} htmlFor="password">
                  Your password:
                </label>
                <input
                  name="password"
                  type="password"
                  className={styles.input}
                  onChange={handleChange}
                ></input>
              </div>
              <Button
                bgColor="bgSecondary"
                type="submit"
                custom={styles.button}
              >
                {type === "signup" && "Sign up"}
                {type === "login" && "Log in"}
              </Button>
              {type === "login" && (
                <Link to="/signup" className={styles.link}>
                  I want to create account
                </Link>
              )}
              {type === "signup" && (
                <Link to="/login" className={styles.link}>
                  I want to log in
                </Link>
              )}
            </form>
            {userLoggedIn && <Redirect to="/plan" />}
          </motion.div>
        </WelcomeTemplate>
      )}
    />
  );
};

export default AuthPage;
