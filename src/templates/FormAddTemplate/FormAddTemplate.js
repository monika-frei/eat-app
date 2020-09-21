import React from "react";
import styles from "./FormAddTemplate.module.scss";
import Heading from "../../components/atoms/Heading/Heading";
import PageType from "../../providers/PageType";

import cx from "classnames";

const FormAddTemplate = ({ children, classOpen }) => {
  const containerClass = cx(styles.container, classOpen);
  return (
    <PageType
      render={(type) => (
        <div className={containerClass}>
          <Heading custom={styles.heading}>
            {type === "plan" && "Plan your meals"}
            {type === "recepies" && "Add a recepie"}
          </Heading>
          {children}
        </div>
      )}
    />
  );
};

export default FormAddTemplate;
