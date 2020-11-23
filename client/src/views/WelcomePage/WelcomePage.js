import React, { useState } from "react";
import styles from "./WelcomePage.module.scss";
import cx from "classnames";
import WelcomeTemplate from "../../templates/WelcomeTemplate/WelcomeTemplate";
import Heading from "../../components/atoms/Heading/Heading";
import Paragraph from "../../components/atoms/Paragraph/Paragraph";
import Button from "../../components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { motion } from "framer-motion";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const WelcomePage = () => {
  const [isOpenPage, setOpenPage] = useState(false);
  const imageClass = cx(styles.image, { [styles.imageOpen]: isOpenPage });
  const containerClass = cx(styles.container, {
    [styles.containerOpen]: isOpenPage,
  });
  const wrapperClass = cx(styles.wrapper, { [styles.wrapperOpen]: isOpenPage });

  return (
    <WelcomeTemplate>
      <section className={containerClass}>
        <div className={wrapperClass}>
          <Heading custom={styles.heading}>
            Easy way to
            <br />
            stay healthy
          </Heading>
          <Paragraph custom={styles.paragraph}>
            Plan your meals, create cooking
            <br />
            book and more
          </Paragraph>
          <Link to={routes.signup}>
            <Button
              bgColor="bgPrimaryDark"
              custom={styles.button}
              onClick={() => setOpenPage(!isOpenPage)}
            >
              Start now
            </Button>
          </Link>
        </div>
        <div className={imageClass}></div>
      </section>
    </WelcomeTemplate>
  );
};

export default WelcomePage;
