import React from "react";
import styles from "./FormAddTemplate.module.scss";
import Heading from "../../components/atoms/Heading/Heading";
import PageType from "../../providers/PageType";
import ButtonIconSmall from "../../components/atoms/ButtonIconSmall/ButtonIconSmall";
import { pageType } from "../../constans/index";
import cx from "classnames";

const FormAddTemplate = ({ children, classOpen, toggle }) => {
  const containerClass = cx(styles.container, classOpen);
  return (
    <PageType
      render={(type) => (
        <div className={containerClass}>
          <Heading custom={styles.heading}>
            {type === pageType.plan && "Plan your meals"}
            {type === pageType.recepies && "Add a recepie"}
          </Heading>
          {children}
          <ButtonIconSmall
            bgImage="buttonDelete"
            btnSize="btn20"
            custom={styles.delete}
            onClick={() => toggle(false)}
          />
        </div>
      )}
    />
  );
};

export default FormAddTemplate;